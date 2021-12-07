Inside `.gitlab-ci.yml`

# Remember to use only two spaces and like below indentation

-- ALSO IF NO STAGE IS SPECIFIED IT WILL AUTO GO TO TEST STAGE

# Guessing this can be commented but don't put it in code while using it in the file

# gitlab adds test job by itself if not specified

## When do jobs fails?

    - After a command is executed it will return an exit status
    0 -> JOB SUCCEEDED
    1-255 -> Job Failed (looking at the error code we can tell)

    - The way we name our stages and the way we name our builds is totally upto us

    # Since below we added two JOBs with same name for the stages they will run in parallel . In this scenario it will definetly not run the job faster in parallel bcoz of overhead of downloading the docker images
      But there are scenarios where it will be faster like if a test is long then we can run seprately other tests like that

# Environment variable (SECRETS) can be defined in the settings

---

```
stages:
  - build
  - test

build website:
  stage: build
  image: node                                   # telling the gitlab runner to use the docker image with node env instead of the default its using. Also, Docker has various other container images and thing can be used
  script:                                       # The scripts which we want to run
    - npm install                               #
    - npm install -g gatsby-cli
    - gatsby build
  artifacts:                                    # Storing the results of the thing which we want to use later for other use
    paths:
      - ./public

test artifact:                            IMP   # For this JOB we would see the default image ruby will be getting used and not node
  image: alpine                                 # since we can specify our own image we have specified alpine which is a minimal docker image which is quite fast i guess
  stage: test
  script:
    - grep -q "Gatsby" ./public/index.html
#    - grep "XXXXXXXXXX" ./public/index.html     # generally a good idea to add something that will fail as well .   ---- Marking at the starting to not include it in the code as its designed to fail the script of the pipeline

test website:
  stage: test
  script:
    - npm install
    - npm install -g gatsby-cli
    - gatsby serve &                                                     # Gatsby serve will usually start the server and will make the terminal stop like when we start a server which is not ideal and will make it execute longer . So, to not hijack the terminal we are pushing it to background using &
    - sleep 3                                                       IMP  # Usually what we want to do is give the server a chance to start and so here we are usning definitely not the smartest way to start we are telling it to sleep for 3 sec which is just making it to sleep for 3 sec no matter when its starting
    - curl "http://localhost:9000" | tac |tac | grep -q "Gatsby"              # tac is waiting for the end of the file to be finished fetched by curl as it returns in reverse direction and then searching for "Gatsby"

```

---

## Stage 2

```
image: node                                             # specifying the default image to be node instead of specifying again and again

stages:
  - build
  - test
  - deploy                                              # check if we need to specify it
  - deployment tests

cache:                                                  # We can specify it at global level or at this level commenting it out coz specifying at global
  key: ${CI_COMMIT_REF_SLUG}                          # will tell the branch. this also means it will be used by jobs which doesn't need cache too but its simpler
  paths:                                         IMP  # ALSO SOMETIMES CACHES CAN MISBEHAVE AND CAUSE FAILURE SO WE CAN CLEAR THE RUNNER CACHES FROM THE PIPELINES VIEW
    - node_modules/

build website:
  stage: build
  <!-- cache:                                           # We can specify it at global level or at this level commenting it out coz specifying at global
    key: ${CI_COMMIT_REF_SLUG}                          # will tell the branch
    paths:
      - node_modules/ -->
  script:
    - echo $CI_COMMIT SHORT_SHA
    - npm install                               #
    - npm install -g gatsby-cli
    - gatsby build
    - sed -i "s/%%VERSION%%/$CI_COMMIT_SHORT_SHA/" ./public/index.html              IMP # here we are using sed command(stream edit somehting like that) to replace in-place or create a new file i guess %%VERSION%% which is already placed by us in the index,html file by the env variable (Can be found in docs which tells basically the commit no) and add it to the build after the build has finished
                                                                                    # THE VERSION is displayed only for a short sec bcoz gatsby will replace the content of all the page and do
  artifacts:
    paths:
      - ./public

test artifact:
  image: alpine
  stage: test
  script:
    - grep -q "Gatsby" ./public/index.html

test website:
  stage: test
  script:
    - npm install
    - npm install -g gatsby-cli
    - gatsby serve &
    - sleep 3
    - curl "http://localhost:9000" | tac |tac | grep -q "Gatsby"


deploy to surge:
  stage: deploy
  script:
    - npm install --global surge                                # surge is used for serverless deployment
    - surge --project ./public --domain xxxx.surge.sh           # the xxx refers to check for the domain if its not taken then only put it there otherwise we can use the

test deployment:
  image: alpine
  stage: deployment tests
  script:
    - apk add --no-cache curl
    - curl -s "<url-link>" | grep -q "Hi People"
    - curl -s "<url-link>" | grep -q "$CI_COMMIT_SHORT_SHA"     # this will work to verify the build or the commit as at startign no js will be loaded and it will fetch the content with it . ALSO THIS IS HOW WE CAN USE GIT LAB VARIABLES INSIDE THE SCRIPTS

```

How does surge know the env variables ?

- It will ask i guess and it asks for specific env var like SURGE_LOGIN

---

- we want to cache some value to further optimize where should we optimize it more should be in build website as this takes time
- ALSO SOMETIMES CACHES CAN MISBEHAVE AND CAUSE FAILURE SO WE CAN CLEAR THE RUNNER CACHES FROM THE PIPELINES VIEW

---

## STAGE 3

```
image: node

stages:
  - build
  - test
  - deploy staging
  - deploy production
  - production tests

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

variables:
  STAGING_DOMAIN: xxxx-staging.surge.sh
  PRODUCTION DOMAIN: xxxx.surge.sh

build website:
  stage: build
  <!-- cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/ -->
  script:
    - echo $CI_COMMIT SHORT_SHA
    - npm install                               #
    - npm install -g gatsby-cli
    - gatsby build
    - sed -i "s/%%VERSION%%/$CI_COMMIT_SHORT_SHA/" ./public/index.html
  artifacts:
    paths:
      - ./public

test artifact:
  image: alpine
  stage: test
  script:
    - grep -q "Gatsby" ./public/index.html

test website:
  stage: test
  script:
    - npm install
    - npm install -g gatsby-cli
    - gatsby serve &
    - sleep 3
    - curl "http://localhost:9000" | tac |tac | grep -q "Gatsby"


deploy staging:
  stage: deploy staging
  environment:                                              # used for tagging our job
    name: staging
    url: http://xxxx-staging.surge.sh
  script:
    - npm install --global surge
    - surge --project ./public --domain xxxx-staging.surge.sh           # the xxx refers to check for the domain if its not taken then only put it there otherwise use something unique and then use for reference i have added staging to it

deploy production:
  stage: deploy production
  environment:                                              # used for tagging our job
    name: production
    url: http://xxxx.surge.sh
  script:
    - npm install --global surge
    - surge --project ./public --domain xxxx.surge.sh           # the xxx refers to check for the domain if its not taken then only put it there otherwise we can use the

production tests:
  image: alpine
  stage: production tests
  script:
    - apk add --no-cache curl
    - curl -s "<url-link>" | grep -q "Hi People"
    - curl -s "<url-link>" | grep -q "$CI_COMMIT_SHORT_SHA"


```

---

## STAGE 4

```
image: node

stages:
  - build
  - test
  - deploy staging
  - deploy production
  - production tests

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

variables:
  STAGING_DOMAIN: xxxx-staging.surge.sh
  PRODUCTION DOMAIN: xxxx.surge.sh

build website:
  stage: build
  script:
    - echo $CI_COMMIT SHORT_SHA
    - npm install                               #
    - npm install -g gatsby-cli
    - gatsby build
    - sed -i "s/%%VERSION%%/$CI_COMMIT_SHORT_SHA/" ./public/index.html
  artifacts:
    paths:
      - ./public

test artifact:
  image: alpine
  stage: test
  script:
    - grep -q "Gatsby" ./public/index.html

test website:
  stage: test
  script:
    - npm install
    - npm install -g gatsby-cli
    - gatsby serve &
    - sleep 3
    - curl "http://localhost:9000" | tac |tac | grep -q "Gatsby"


deploy staging:
  stage: deploy staging
  environment:                                              # used for tagging our job
    name: staging
    url: http://$STAGING_DOMAIN
  script:
    - npm install --global surge
    - surge --project ./public --domain $STAGING_DOMAIN         # the xxx refers to check for the domain if its not taken then only put it there otherwise use something unique and then use for reference i have added staging to it

deploy production:
  stage: deploy production
  environment:                                              # used for tagging our job
    name: production
    url: http://$PRODUCTION_DOMAIN                          # VARIABLE USED
  when: manual                                              # This is how we manually trigger a job or stage
  allow_failure: false                                      # and to stop other job for executing after this job
  script:
    - npm install --global surge
    - surge --project ./public --domain $PRODUCTION_DOMAIN            # the xxx refers to check for the domain if its not taken then only put it there otherwise we can use the

production tests:
  image: alpine
  stage: production tests
  script:
    - apk add --no-cache curl
    - curl -s "<url-link>" | grep -q "Hi People"
    - curl -s "<url-link>" | grep -q "$CI_COMMIT_SHORT_SHA"


```

---

## STAGE 5

Here we are only want to do some job on master and avoid doing on different branches like deploying to prod and staging and running test on it . Basically we want the last 3 to be executed only on master branch and not on every branch
for that we use only and then tell that we can deploy it there

```
image: node

stages:
  - build
  - test
  - deploy review
  - deploy staging
  - deploy production
  - production tests

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

variables:
  STAGING_DOMAIN: xxxx-staging.surge.sh
  PRODUCTION DOMAIN: xxxx.surge.sh

build website:
  stage: build
  script:
    - echo $CI_COMMIT SHORT_SHA
    - npm install                               #
    - npm install -g gatsby-cli
    - gatsby build
    - sed -i "s/%%VERSION%%/$CI_COMMIT_SHORT_SHA/" ./public/index.html
  artifacts:
    paths:
      - ./public

test artifact:
  image: alpine
  stage: test
  script:
    - grep -q "Gatsby" ./public/index.html

test website:
  stage: test
  only:
    - merge_requests

  script:
    - npm install
    - npm install -g gatsby-cli
    - gatsby serve &
    - sleep 3
    - curl "http://localhost:9000" | tac |tac | grep -q "Gatsby"

deploy review:
  stage: deploy review
  environment:                                              # used for tagging our job
    name: review/$CI_COMMIT_REF_NAME
    url: http://xxxx-$CI_ENVIRONMENT_SLUG.surge.sh
    on_stop: stop_review                                            # configured for stopping and will stopp it( The name of the job)
  script:
    - npm install --global surge
    - surge --project ./public --domain xxxx-$CI_ENVIRONMENT_SLUG.surge.sh

stop review:                                                                         # can be seen on gitlab pages for destroying (likr in case of surge tearing down the pages)
  stage: deploy review
  only:
    - merge_requests
  variables:
    GIT_STRATEGY: none
  script:
    - echo "REMOVE review app"
    - npm install --global surge
    - surge teardown xxxx-$CI_ENVIRONMENT_SLUG.surge.sh
  when: manual
  environment:
    name: review/$CI_COMMIT_REF_NAME
    action: stop

deploy staging:
  stage: deploy staging
  environment:                                              # used for tagging our job
    name: staging
    url: http://$STAGING_DOMAIN
  only:
    - MASTER
  script:
    - npm install --global surge
    - surge --project ./public --domain $STAGING_DOMAIN         # the xxx refers to check for the domain if its not taken then only put it there otherwise use something unique and then use for reference i have added staging to it

deploy production:
  stage: deploy production
  environment:                                              # used for tagging our job
    name: production
    url: http://$PRODUCTION_DOMAIN                          # VARIABLE USED
  only:
    - MASTER                                                # Branch name which we want to only deploy
  script:
    - npm install --global surge
    - surge --project ./public --domain $PRODUCTION_DOMAIN            # the xxx refers to check for the domain if its not taken then only put it there otherwise we can use the

production tests:
  image: alpine
  stage: production tests
  only:
    - MASTER
  script:
    - apk add --no-cache curl
    - curl -s "<url-link>" | grep -q "Hi People"
    - curl -s "<url-link>" | grep -q "$CI_COMMIT_SHORT_SHA"


```

## %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

## STAGE 6

```
image: node

stages:
  - build
  - test
  - deploy review
  - deploy staging
  - deploy production
  - production tests

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

variables:
  STAGING_DOMAIN: xxxx-staging.surge.sh
  PRODUCTION DOMAIN: xxxx.surge.sh

build website:
  stage: build
  script:
    - echo $CI_COMMIT SHORT_SHA
    - npm install                               #
    - npm install -g gatsby-cli
    - gatsby build
    - sed -i "s/%%VERSION%%/$CI_COMMIT_SHORT_SHA/" ./public/index.html
  artifacts:
    paths:
      - ./public

test artifact:
  image: alpine
  stage: test
  script:
    - grep -q "Gatsby" ./public/index.html

test website:
  stage: test
  only:
    - merge_requests

  script:
    - npm install
    - npm install -g gatsby-cli
    - gatsby serve &
    - sleep 3
    - curl "http://localhost:9000" | tac |tac | grep -q "Gatsby"

deploy review:
  stage: deploy review
  environment:
    name: review/$CI_COMMIT_REF_NAME
    url: http://xxxx-$CI_ENVIRONMENT_SLUG.surge.sh
    on_stop: stop_review
  script:
    - npm install --global surge
    - surge --project ./public --domain xxxx-$CI_ENVIRONMENT_SLUG.surge.sh

stop review:                                                                         # can be seen on gitlab pages for destroying (likr in case of surge tearing down the pages)
  stage: deploy review
  only:
    - merge_requests
  variables:
    GIT_STRATEGY: none
  script:
    - echo "REMOVE review app"
    - npm install --global surge
    - surge teardown xxxx-$CI_ENVIRONMENT_SLUG.surge.sh
  when: manual
  environment:
    name: review/$CI_COMMIT_REF_NAME
    action: stop

deploy staging:
  stage: deploy staging
  environment:                                              # used for tagging our job
    name: staging
    url: http://$STAGING_DOMAIN
  only:
    - MASTER
  script:
    - npm install --global surge
    - surge --project ./public --domain $STAGING_DOMAIN         # the xxx refers to check for the domain if its not taken then only put it there otherwise use something unique and then use for reference i have added staging to it

deploy production:
  stage: deploy production
  environment:
    name: production
    url: http://$PRODUCTION_DOMAIN
  only:
    - MASTER
  before_script:
    - echo "i can add my script here like i can do installation part here and doo something rest other place"
    - echo "Deploying to production"
    - npm install --global surge
  script:
    - surge --project ./public --domain $PRODUCTION_DOMAIN            # the xxx refers to check for the domain if its not taken then only put it there otherwise we can use the

production tests:
  image: alpine
  stage: production tests
  only:
    - MASTER
  script:
    - apk add --no-cache curl
    - curl -s "<url-link>" | grep -q "Hi People"
    - curl -s "<url-link>" | grep -q "$CI_COMMIT_SHORT_SHA"


```

---

## YAML BASICS

test.yml

- can be considered as key value pairs

# this is a comment

# this is more similar to JSON

```
person:
  name: John      # this can be in ""
  age:29
  isMale: true
  stuff:                    # can be specified like a list
    - laptop
    - car
    - bike
  food: [pizza, donuts, coke]     # arrays
  friends:                      # list of objects
    - name: Jane
      age: 19
    - name: Mike
      age: 22

```

---

## Disabling Jobs

```
we can put a '.' infront of it and it will disable the job. We do this suppose the job is not relying on other jobs then
we can do that


.build website:
  stage: build
  script:
    - echo $CI_COMMIT SHORT_SHA
    - npm install                               #
    - npm install -g gatsby-cli
    - gatsby build
    - sed -i "s/%%VERSION%%/$CI_COMMIT_SHORT_SHA/" ./public/index.html
  artifacts:
    paths:
      - ./public

```

---

## ANCHORS - YAML

```
person:
  name: &name John      # this can be in "". Also "&name" is a alias whatever we specify after is gets in its value to use it elsewhere we can do *name
  age:29
  isMale: true
  stuff:                    # can be specified like a list
    - laptop
    - car
    - bike
  food: [pizza, donuts, coke]     # arrays
  friends:                      # list of objects
    - name: Jane
      age: 19
    - name: Mike
      age: 22person:
  self: *name       # this change can be seen in the yaml to json converter so this value will be John and abv changes then

```

This is powerfull suppose we want to merge two properties then we can do that by following. how is this helpfull is

```
base_person: &base
  city: nyc
  country: usa

person1:
  <<; *base                     # we are merging the property here from the base thing
  name: &name John      # this can be in "". Also "&name" is a alias whatever we specify after is gets in its value to use it elsewhere we can do *name
  age:29
  isMale: true
  stuff:                    # can be specified like a list
    - laptop
    - car
    - bike
  food: [pizza, donuts, coke]     # arrays
  friends:                      # list of objects
    - name: Jane
      age: 19
    - name: Mike
      age: 22person:
  self: *name

```

### Shortening code example using anchors for YAML for the above (Also there is a eslint on the website to test out the YAML code)

```

.deploy_template: &deploy
  only:
    - MASTER
  script:
    - npm install --global surge
    - surge --project ./public --domain $DOMAIN
  environment:                                              # used for tagging our job
    url: http://$DOMAIN

deploy staging:
  <<: *deploy
  stage: deploy staging
  variables:
    DOMAIN: $STAGING_DOMAIN
  environment:                                              # used for tagging our job
    name: staging
    url: http://$STAGING_DOMAIN


deploy production:
  <<: *deploy
  stage: deploy production
  variables:
    DOMAIN: $PRODUCTION_DOMAIN
  environment:
    name: production


```
