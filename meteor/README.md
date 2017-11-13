## deploy to heroku

### set up server

```
heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
heroku config:set ROOT_URL=http://maree.herokuapp.com
heroku config:set METEOR_APP_DIR=meteor/
heroku config:set METEOR_SETTINGS={\"public\":{\"api_prefix\":\"api/\"}}
heroku addons:create mongolab
# heroku labs:enable http-session-affinity # only if running admin interfaceon multiple dynos
```

### set up git remote

```
heroku git:remote -a xxx
```

### scale dynos

There are 2 ways to run it:

#### A) High-Load multi-dynos
Use Procfile to enable web and worker dynos.

You can run multiple web dynos.
```
heroku ps:scale web=2
```

You must run exactly one worker dyno.

```
heroku ps:scale worker=1
```

#### B) Low-Load single-dyno
Rename Procfile to Procfile.disabled so heroku does not recognize it and run just one web dyno.

### high-performance setup

3 heroku apps:
- 1) mareedeslettres: uses procfile, runs multiple web dynos and 1 worker dyno
- 2) maree-admin: runs only 1 web dyno (separate to makes sure that the admin interface stays responsive and can use websockets without interfering with the REST api)
- 3) maree-web: runs web site server

heroku plugins:
app 1) has a dedicated mongolab mongo db and fastly TLS plugin
-> enable fastly in settings-live.json and update it on the heroku server as well

3 domains:
- api.lettres.paris points to fastly server of mareedeslettres (see 1rCX4awk5ydET4mYw5WurW_5.vcl for example config)
- admin-lettres.paris points to maree-admin
- www.lettres.paris points to web site server maree-web
