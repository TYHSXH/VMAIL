from datetime import datetime
from decimal import Decimal
import unittest
from backend.assistant_pricing import BEIJING, accumulate_usage, estimate_cost

class PricingTests(unittest.TestCase):
    usage = {'prompt_tokens':1000,'prompt_cache_hit_tokens':600,'prompt_cache_miss_tokens':400,'completion_tokens':100,'total_tokens':1100}

    def at(self, day, hour):
        return datetime.fromisoformat(f'{day}T{hour:02}:00:00').replace(tzinfo=BEIJING).timestamp()

    def test_cache_and_output_rates_for_both_models(self):
        now=self.at('2026-11-06',16)
        self.assertEqual(estimate_cost(self.usage,'deepseek-flash',now),Decimal('0.001624'))
        self.assertEqual(estimate_cost(self.usage,'deepseek-v4-pro',now),Decimal('0.006480'))

    def test_off_peak_weekend_and_holiday(self):
        for day,hour in [('2026-11-06',18),('2026-11-07',10),('2026-10-01',10)]:
            self.assertEqual(estimate_cost(self.usage,'deepseek-flash',self.at(day,hour)),Decimal('0.000812'))

    def test_every_tool_round_is_accumulated_without_rounding_each_request(self):
        total={}
        accumulate_usage(total,self.usage,'deepseek-flash',self.at('2026-11-06',16))
        accumulate_usage(total,self.usage,'deepseek-flash',self.at('2026-11-06',18))
        self.assertEqual(total['total_tokens'],2200)
        self.assertEqual(Decimal(total['estimated_cost_cny']),Decimal('0.002436'))
        accumulate_usage(total,{'total_tokens':10},'deepseek-flash',self.at('2026-11-06',18))
        self.assertIsNone(total['estimated_cost_cny'])

    def test_unknown_or_inconsistent_usage_does_not_become_zero_cost(self):
        now=self.at('2026-11-06',16)
        for usage,model in [({'total_tokens':10},'deepseek-flash'),(self.usage,'unknown'),({**self.usage,'prompt_cache_miss_tokens':999},'deepseek-flash')]:
            self.assertIsNone(estimate_cost(usage,model,now))
