param($installPath, $toolsPath, $package, $project)

$path = [System.IO.Path]
$solution = Get-Interface $dte.Solution ([EnvDTE80.Solution2])
$solutionRoot = $path::GetDirectoryName($solution.FileName)

$solutionFolder = $solution.Projects | where-object { $_.ProjectName -eq "Solution Items" } | select -first 1
if(!$solutionFolder)
{ 
	$solutionFolder = $solution.AddSolutionFolder("Solution Items") 
}

$folderItems = Get-Interface $solutionFolder.ProjectItems ([EnvDTE.ProjectItems])
$nuspecFileName = $project.Name + ".nuspec"

foreach($fileName in "README.md", "LICENSE.md", $nuspecFileName)
{
	$filePath = "$solutionRoot\$fileName"

	$folderItems.Item($fileName).Remove()
	remove-item -Force $filePath
}