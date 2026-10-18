$ErrorActionPreference = 'Stop'

try {
    # Discover the project from this script, regardless of the current directory.
    $projectPath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).ProviderPath
    foreach ($name in @('setup.bat', 'requirements.txt', 'backend\bootstrap.py')) {
        if (-not (Test-Path -LiteralPath (Join-Path $projectPath $name) -PathType Leaf)) {
            throw "Not a complete VMAIL project: missing $name."
        }
    }

    $environmentPath = Join-Path $projectPath '.venv'
    if (-not (Test-Path -LiteralPath $environmentPath)) {
        Write-Host 'VMAIL local Python environment is already uninstalled.'
        exit 0
    }

    $environmentItem = Get-Item -LiteralPath $environmentPath -Force
    if (-not $environmentItem.PSIsContainer -or
        ($environmentItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
        throw 'Refusing to remove .venv: it is not an ordinary project directory.'
    }
    $resolvedEnvironmentPath = (Resolve-Path -LiteralPath $environmentPath).ProviderPath
    if (-not [string]::Equals($resolvedEnvironmentPath, $environmentPath, [StringComparison]::OrdinalIgnoreCase) -or
        -not [string]::Equals((Split-Path -Parent $resolvedEnvironmentPath), $projectPath, [StringComparison]::OrdinalIgnoreCase)) {
        throw 'Refusing to remove an environment outside this project.'
    }
    if (-not (Test-Path -LiteralPath (Join-Path $resolvedEnvironmentPath 'pyvenv.cfg') -PathType Leaf)) {
        throw 'Refusing to remove .venv: no Python virtual environment configuration was found.'
    }

    # Inspect one directory at a time; never follow junctions or symbolic links.
    # Detect locked native modules before removing any installed packages.
    $pendingDirectories = [Collections.Generic.Stack[string]]::new()
    $pendingDirectories.Push($resolvedEnvironmentPath)
    while ($pendingDirectories.Count -gt 0) {
        $directoryPath = $pendingDirectories.Pop()
        foreach ($item in Get-ChildItem -LiteralPath $directoryPath -Force) {
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
                throw "Refusing to follow a link inside .venv: $($item.FullName)"
            }
            if ($item.PSIsContainer) {
                $pendingDirectories.Push($item.FullName)
            } elseif ($item.Extension -in @('.exe', '.dll', '.pyd')) {
                try {
                    $handle = [IO.File]::Open($item.FullName, [IO.FileMode]::Open, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
                    $handle.Dispose()
                } catch {
                    throw 'The Python environment is in use or not writable. Stop VMAIL with Ctrl+C and close programs using this environment, then retry.'
                }
            }
        }
    }

    # Only this verified absolute path is removed; no wildcard or external shell.
    Remove-Item -LiteralPath $resolvedEnvironmentPath -Recurse -Force -ErrorAction Stop
    Write-Host 'Uninstalled VMAIL local Python dependencies, including native MuJoCo.'
    Write-Host 'Project files, tasks, saved results and old environment backups are preserved.'
    Write-Host 'System Python and Conda environments are unchanged. Run start.bat to reinstall.'
    exit 0
} catch {
    Write-Host "Uninstall failed: $($_.Exception.Message)"
    exit 1
}
