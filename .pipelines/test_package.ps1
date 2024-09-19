$packPath = (Get-ItemPropertyValue -Path *.tgz -Name FullName)
echo $packPath
mkdir testProject
Copy-Item -Path ".npmrc" -Destination "testProject"
cd .\testProject
npm init -y
npm install $packPath
cd ..
rm -r .\testProject\
