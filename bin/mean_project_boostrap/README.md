# Description #
A quick bash script to help boostrap the initial DEV environment for a MEAN project.

# Pre-requisites
I will add details on how to install this as time permits.  However, you  need the following:

* Angular cli installed (either via nodepm or brew)
* NodeJS

# How to Run this Script? #
* Clone/Download the script.
* Modify the PATH defintions to fit your DEV ENV (I am planning to change this).
* Change the permission of the script to excute from your current location:

  ./bootstrap_mean_project.sh your_project_name


The script runs well on MACOSX and Linux. 

# ToDo:
* modify boostrap script to take project source files as an argument and delete all those absolute path definitions.
* prettify the script: refactor, etc.
* Evolve this to use ansible, or something along those lines, as needed to setup a repeatable dev environment deployment for MEAN. 
