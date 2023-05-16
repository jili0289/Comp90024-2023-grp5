How to set up:

First ensure your computer have python installed

Then create a virtualenv under backend directory

Comp90024-2023-grp5> python -m venv env

Then activate the virtualenv with the following command

if you are on Linux: source env/bin/activate
if you are on Windows: .\env\Scripts\activate

Then install required package with: pip install -r requirements.txt

Finally run the server with: python manage.py runserver

If packages are added, run: pip freeze > requirements.txt to update pip requirements