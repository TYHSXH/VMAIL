"""Local CNY estimates, never a claim about the account's actual deduction."""
from datetime import datetime, timedelta, timezone
from decimal import Decimal

# Verified 2026-11-06: https://api-docs.deepseek.com/zh-cn/quick_start/pricing/
# Off-peak CNY per million tokens: cache hit, cache miss, completion (incl. thinking).
RATES = {"deepseek-flash": ("0.02", "1", "4"), "deepseek-v4-pro": ("0.15", "4.5", "13.5")}
BEIJING = timezone(timedelta(hours=8))
# State Council 2026 holiday calendar; refresh alongside the published tariff.
# https://www.gov.cn/zhengce/content/202511/content_7047090.htm
HOLIDAYS = {2026: (("01-01", "01-03"), ("02-15", "02-23"), ("04-04", "04-06"),
                   ("05-01", "05-05"), ("06-19", "06-21"), ("09-25", "09-27"), ("10-01", "10-07"))}


def estimate_cost(usage, model, created):
    """Return Decimal yuan, or None when the rate/usage/calendar is unknown."""
    if model not in RATES or not isinstance(usage, dict):
        return None
    local = datetime.fromtimestamp(created, BEIJING)
    if local.year not in HOLIDAYS:
        return None
    prompt, output = usage.get("prompt_tokens"), usage.get("completion_tokens")
    details = usage.get("prompt_tokens_details") or {}
    hit = usage.get("prompt_cache_hit_tokens", details.get("cached_tokens", 0))
    if any(type(value) is not int or value < 0 for value in (prompt, output, hit)) or hit > prompt:
        return None
    miss = usage.get("prompt_cache_miss_tokens", prompt - hit)
    if type(miss) is not int or miss < 0 or hit + miss != prompt:
        return None
    day = local.strftime("%m-%d")
    holiday = any(start <= day <= end for start, end in HOLIDAYS[local.year])
    peak = local.weekday() < 5 and not holiday and (9 <= local.hour < 12 or 14 <= local.hour < 18)
    amount = sum(Decimal(rate) * tokens for rate, tokens in zip(RATES[model], (hit, miss, output)))
    return amount * (2 if peak else 1) / 1_000_000


def accumulate_usage(total, usage, model, created):
    cost = estimate_cost(usage, model, created)
    previous = total.get("estimated_cost_cny", "0")
    for name, value in (usage or {}).items():
        if type(value) in (int, float) and name != "estimated_cost_cny":
            total[name] = total.get(name, 0) + value
    total["estimated_cost_cny"] = str(Decimal(previous) + cost) if previous is not None and cost is not None else None
