timestamps {
	
	node () {
		
		def PROJECT="/home/ubuntu/Dev/portfolio"
		def PYTHON_P="$PROJECT/bin/python3.6"
		def GET_SECRET="/var/lib/jenkins/run_vars_port.py"
		
		
		stage ('Checkout') {
			// checkout scm
			sh """ 
			cd $PROJECT
			sudo git fetch --all
			sudo git reset --hard origin/master
			"""
		}
		
		// stage ('Replace') {

		// 	sh """ 

		// 	whoami
		// 	echo "moving jenkins workspace $WORKSPACE to the apache project location"
		// 	sudo service apache2 stop
		// 	sudo rm -rf $PROJECT
		// 	sudo cp -r $WORKSPACE $PROJECT

        //     		""" 
        // 	}
		stage ('Build') {
			
		    sh """ 

			cd $PROJECT
			sudo virtualenv -p python3 .
			sudo chmod 770 $PYTHON_P
			sudo chown -R www-data:www-data $PROJECT
			. bin/activate
			echo 'which python are you running?'
			which python
			cd src

			sudo $PYTHON_P -m pip install --upgrade pip # Upgrade pip
			echo 'pip upgrade done'
			sudo $PYTHON_P -m pip install -r REQUIREMENTS.txt # Install or upgrade dependencies
			echo 'pip install done'
			sudo $PYTHON_P $GET_SECRET
			echo 'var import done'

			# sudo $PYTHON_P manage.py createcachetable cache_table

			sudo $PYTHON_P manage.py makemigrations                  

			sudo $PYTHON_P manage.py migrate                  
			echo 'manage.py migrate done'

			# sudo /usr/local/bin/compile_messages

			sudo $PYTHON_P manage.py collectstatic --noinput  # Collect static files
			echo 'manage.py collectstatic done'

			deactivate # quit the virtual environment

			sudo service apache2 start

			""" 
		}
		stage ('Test') {
		}

	}
}
