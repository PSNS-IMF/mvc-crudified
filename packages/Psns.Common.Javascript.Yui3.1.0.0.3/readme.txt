YUI (http://yuilibrary.com/), an industrial-strength javascript library

*** Required Prerequisites ***

	* Install YUI Locally for Development

	From the Git Bash command prompt, change to the Scripts directory:
	cd <Your Local Mvc Project Directory>/Scripts

	Then run these:
	git clone http://github.com/yui/yui3
	git clone http://github.com/yui/yui3-gallery
	
	or just copy the two folders from:
	\\spssvr002\Webfiles\inetpub\wwwroot-syappsdev\Static\scripts

	** It's recommended to NOT include YUI in your TFS build because the size of
	this library will significantly slow the build down.

*** Instructions
	* Install
		- The new files will be copied to the appropriate location with this path as the base: Scripts\yui3-gallery\build\<module name>
		- Files that are replaced with be copied into an archive folder: Scripts\yui3-gallery\build\<module name>\previous
	* Uninstall
		- Files in Scripts\yui3-gallery\build\<module name>\previous will be moved back into Scripts\yui3-gallery\build\<module name>
			over-writing the installed ones