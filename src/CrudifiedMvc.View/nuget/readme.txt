** Psns Crudified Mvc **

This package provides a base UI layer for CRUD functionality and is built
on the following libraries:

Pure Css (http://purecss.io/), a responsive Css library
Font Awesome (http://fortawesome.github.io/Font-Awesome/), Css Icons
YUI (http://yuilibrary.com/), an industrial-strength javascript library

*** Required Prerequisites ***

1.) Install YUI Locally for Development

	From the Git Bash command prompt, change to the Scripts directory:
	cd <Your Local Mvc Project Directory>/Scripts

	Then run these:
	git clone http://github.com/yui/yui3
	git clone http://github.com/yui/yui3-gallery

*** Instructions ***

1.) Copy the YUI and YUI Gallery libraries into your Scripts folder from: \\spssvr023\WebFiles\inetpub\wwwroot\Static\Scripts
2.) Create a Model and Decorate for View Builder
3.) Bind Repositories
4.) Implement a "CrudController"; Controller names must be pluralized (i.e. MyModel -> MyModelsController)