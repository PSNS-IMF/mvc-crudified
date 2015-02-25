# Psns.Common.Mvc.Crudified [![NuGet Version](http://img.shields.io/nuget/v/Psns.Common.Mvc.Crudified.svg?style=flat)](https://www.nuget.org/packages/Psns.Common.Mvc.Crudified/) [![NuGet Downloads](http://img.shields.io/nuget/dt/Psns.Common.Mvc.Crudified.svg?style=flat)](https://www.nuget.org/packages/Psns.Common.Mvc.Crudified/)

This package provides a base UI layer for CRUD functionality and is built
on the following libraries:
* [Pure Css](http://purecss.io/), a responsive Css library
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/), Css Icons
* [YUI](http://yuilibrary.com/), an industrial-strength javascript library

## Prerequisites

* Install YUI Locally for Development
  * From the Git Bash command prompt, change to the Scripts directory:
	cd <Your Local Mvc Project Directory>/Scripts
  * Then run these:
    * git clone http://github.com/yui/yui3
    * git clone http://github.com/yui/yui3-gallery

## Instructions
1. Copy the YUI and YUI Gallery libraries into your Scripts folder
2. Create a Model and Decorate for View Builder
3. Bind Repositories
4. Implement a "CrudController"; Controller names must be pluralized (i.e. MyModel -> MyModelsController)

## CI build status
[![Build Status](https://www.myget.org/BuildSource/Badge/psns-common?identifier=f0e76bb8-c348-4071-b39d-8b6a193dcbcf)](https://www.myget.org/)