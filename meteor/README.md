## deploy to heroku

### set up server

```
heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
heroku config:set ROOT_URL=http://maree.herokuapp.com
heroku config:set METEOR_APP_DIR=meteor/
heroku config:set METEOR_SETTINGS={\"public\":{\"api_prefix\":\"api/\"}}
heroku addons:create mongolab
heroku labs:enable http-session-affinity
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
