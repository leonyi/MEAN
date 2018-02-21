#!/bin/bash 
#-x

# Author: Yanet (yleon)
# Name: bootstrap_mean_project.sh 

# Todo: Add args to setup the directory based on argument passed: n for node, e for express, etc.
PROJECT_HOME="/Users/yleon/Dev/Angular"
SERVER_SOURCE="/Users/yleon/Dev/MeaN/bin/mean_project_boostrap/server"
CLIENT_SOURCE="/Users/yleon/Dev/MeaN/bin/mean_project_boostrap/angular"


decorate () {
    message="$@"
    length=${#message}
    header_footer=`printf "="'%.s' $(eval "echo {1.."$(($length))"}")`
    echo "${header_footer}"
    echo -e "$message"
    echo "${header_footer}"
}

log () { echo "\$ $@" ; "$@"; echo "" ; }

setup_server_dir_structure () {
	project_name=$1

 	decorate "Creating directory:"
	log rsync -avh --stats --progress $SERVER_SOURCE $PROJECT_HOME/$project_name/
}

transfer_app_src_files () {
	log cd $PROJECT_HOME/$project_name/client/src/app/ && mv app.module.ts was_app.module.ts && mv app.component.ts was_app.component.ts
	log cp $CLIENT_SOURCE/app.module.ts     $PROJECT_HOME/$project_name/client/src/app/
	log cp $CLIENT_SOURCE/app.component.ts  $PROJECT_HOME/$project_name/client/src/app/
	log cp $CLIENT_SOURCE/http.service.ts   $PROJECT_HOME/$project_name/client/src/app/
}


#: ${1?"Usage: $0 nodejs_project_name"}
if [[ $# -ne 1 ]]; then
    	exit 2
else
	project_name=$1
fi


if [[ -d $PROJECT_HOME/$project_name ]]; then 
	decorate "Project: $project_name already exists!"
	decorate  "PROJECT_HOME: $PROJECT_HOME"
	exit 2
else
	decorate "1. Creating the server directory structure for $project_name:"
	log mkdir -p $PROJECT_HOME/$project_name

	decorate "2. Adding the $PROJECT_HOME/$project_name/server.js file"
	log setup_server_dir_structure $project_name

	decorate "3. Installing the base modules under  $PROJECT_HOME/$project_name"
	log cd $PROJECT_HOME/$project_name/server &&  for p in express ejs body-parser mongoose ;do npm init -y; npm install $p --save;done

	decorate "4. Installing mongoose-validator under  $PROJECT_HOME/$project_name"
	log cd $PROJECT_HOME/$project_name/server && npm install mongoose-validator -S

	decorate "5. Setting up the client (angular) directory structore under  $PROJECT_HOME/$project_name"
	log cd $PROJECT_HOME/$project_name/ && ng new client --routing

	# yleon: Leaving this out, at the moment, while I play with bootstrap installed from npm.
	#decorate "6. Transferring indext.html with mini boostrap setup under  $PROJECT_HOME/$project_name/client/src"
	#log mv $PROJECT_HOME/$project_name/client/src/index.html $PROJECT_HOME/$project_name/client/src/was_index.html
	#log cp $CLIENT_SOURCE/yeti_bootstrap_index.html $PROJECT_HOME/$project_name/client/src/index.html

	decorate "7. Generating the http service for our project under $PROJECT_HOME/$project_name/client"
	log cd $PROJECT_HOME/$project_name/client && ng generate service http --no-spec && mv http.service.ts  was_http.service.ts 

	decorate "8. Transferring app src files to $PROJECT_HOME/$project_name/client/src/app/"
	transfer_app_src_files

	decorate "9. Setting up boostrap under $PROJECT_HOME/$project_name/client/"
	log cd $PROJECT_HOME/$project_name/client && npm install --save bootstrap@3

	decorate "Remebmer to update: $PROJECT_HOME/$project_name/client/.angualar.cli with the following:"
	echo '
	    "styles": [
            "../node_modules/bootstrap/dist/css/bootstrap.min.css”,
            "styles.css"
            ],
	'	

	decorate "MEAN project ready at $PROJECT_HOME/$project_name!"
	
fi
