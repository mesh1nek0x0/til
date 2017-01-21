# OSXのシステム情報に関するtips

## print Mac OS X operating system version information

Usage: sw_vers [-productName|-productVersion|-buildVersion]
```
$ sw_vers
ProductName:	Mac OS X
ProductVersion:	10.11.3
BuildVersion:	15D21

$ sw_vers -productName
Mac OS X
local-mesh1neko:minions$ sw_vers -productVersion
10.11.3
local-mesh1neko:minions$ sw_vers -buildVersion
15D21
```
