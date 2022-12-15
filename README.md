# My Portfolio! Data Brought To You By Rails

Originally written using Rails 5, my React-based portfolio would fetch data from a fully fledged Rails app, perfectly capable of serving up its own html. Around the same time that I started building out the two apps, front-end and back-end, Rails 6 was be released. As it released, I looked further into the documentation and found a great solution to get things up and running faster, API mode! A Rails app can very easily be created using the CLI, and with the addition of the '--api' flag, it'll drop any unnecessary middleware, leaving behind a powerful but lightweight Rails API! Though I've had to sacrifice API mode for ActiveAdmin to work, it has allowed me to get even more familiar with Ruby and Ruby on Rails itself. As with any project, doing your best to take advantage of any chosen library's capacity to speed up development and to keep focused on fleshing out tougher features, not only makes for a better product but makes the dev's life much easier. Rails definitely delivers on that promise, and has allowed me to tame both these beasts, especially React and the many techniques that it employs to create beautiful front-ends. 

While writing the two apps, I had plenty of time to think about the number of projects I had written going through my Mobile Apps Minor at the University of Southern California, and found myself thinking that my journey as a software developer is exactly how I'd layout my portfolio, step by step, project by project and type by type. From mobile app development to web development and even basic GUI development, I feel confident as ever to take on any task in any language or framework and that's exactly what I'd like to convey! While relatively simple compared to my passion projects, like the Infection Control web, Android and iOS app or my Laravel + VueJS Accounting On It property management web app, the tech options behind it and possibilities feel endless. As a result, I look forward to improving it and adding to it each and every year!

## Future Development
- From here out, focus on this project rather than the Rails 5 version. 
  - Create a Swagger UI inspired routes list view
  - Drop ActiveAdmin for simple React-based forms + Login via same Devise system.
    - Would allow for Rails 7 version in API mode
  - Update to new timeline-based design with new and improved RPG-based homepage
- Contact Us from the back-end!
  - Front End Setup - DONE
  - Email Server? Heroku no longer an option
- Include the following in Seeder:
  - Laravel + Vue Accounting On It
  - Most of my experience with classic GUIs (Made in Java)
- Ruby 3 is now an option thanks to Rails 6.1 and Rails 7.0.1!
  - Similarly Webpacker 5.x is an option on Rails 6 BUT since React can bundle itself, it's best to let it handle the production build while Rails serves it up
    - Note: Webpacker 5.x uses webpack 4.x meanwhile if Rails upgrades to Webpacker 6.x (current), it'll be webpack 5.x
    - Note for future upgrade: Rails includes `bin/rails webpacker:install` to handle update to webpacker similar to how ActiveAdmin works using 
    `bin/rails g active_admin:install` with one additional step of adding `config.use_webpacker = true` in config/initializers/active_admin.rb
      - Sprockets handles activeAdmin Sass, Css, images just fine anyway for now 
      - BUT if dropping ActiveAdmin Webpacker will be entirely unnecessary since React can build itself.

## Notes to Remember! - December 2022
### Bundler
- A nifty package manager for Ruby with two ways of updating
  - `bundle install` conservatively updates packages once you modify the Gemfile. It only will update based on changes
  - `bundle update` on the other hand, will update all packages to their latest versions, respecting the limits set by the Gemfile
    BUT updating as much as it can nonetheless. This can be good and bad! It'll resolve any Gemfile lock issues as an example but may cause breaking changes
  - `bundle outdated --minor` and `bundle outdated --filter-minor` particularly helpful for checking for smaller upgrades and preventing said breaking changes before running `bundle update`
    - BUT just flat out using `bundle update --minor` DOES guarantee only minor upgrades (e.g. 1.0 to 1.1) will happen if the Gemfile permits such updates to happen for certain packages (i.e. "~> 1.0" and "'>= 1.0', '< 2.0'" would both get minor updates!)
### Rails and its Commands
- Useful Rails Commands - To Serve and Display Locally `bin/rails s & yarn --cwd react-client start`
  - For list of commands, run `bin/rails` in the root rails dir
  - `bin/rails app:update` -> Update old files and generate any new ones after updating the Gemfile and running `bundle install`
    - Running this command makes a 'new_framework_defaults' file, which lists settings that will be turned on or changed when you update config.load_defaults in config/application.rb from oldMaj.oldMin to newMaj.newMin (e.g. 6.0 to 6.1). 
      - So it's best to uncomment line by line to see how each changes/breaks things rather than update config.load_defaults first and break things all at once.
        - Minor updates (ex: 6.0 to 6.1) may break nothing allowing you to quickly update config.load_defaults without a problem BUT better to be cautious
        - You may not want to change a line/option in new_framework_defaults so either change it across environments by placing it at the end of config/application.rb OR add it to a single environment in the config directory
        - Patch updates (ex: 5.2.4 to 5.2.6) still make a new_framework_defaults file BUT in that case, config.load_defaults does not need to be updated ('config.load_defaults 5.2') and nothing should break.
  - `bin/rails server` -> Start up the server (shortcut -> `bin/rails s`)
  - `bin/rails test` -> Test all except system tests (shortcut -> `bin/rails t`)
### My Package.json Commands
- Preface to next point, Facebook still uses yarn primarily BUT since yarn is installed via NPM (on Railway), it's pretty easy to get confused. 
  - `npx create-react-app app-name` still used to make a new React app. 
  - Yarn commands mentioned in the React README handle the production build + testing. Also includes `yarn start` identical in use to the typical `npm start`
- When deploying to Railway, it will use 3 commands to install, build and deploy the React files
  - The `railway-install` command ensures the needed dependencies are installed via a frozen-lockfile that will ensure the same versions used here are used on Railway.
  The frozen lockfile will not be updated if Yarn notices the dependencies can be upgraded, therefore we get the exact same build later.
  - The `railway-build` command in the Rails root `package.json` is used to switch the current working directory to the react-client directory, and uses `yarn build` to make the production build for Rails to serve
      - React uses `yarn build` to make the production build in its root `build` dir, in this case the `/react-client` folder. Here, our Rails root `package.json` must drop down a directory into the `/react-client` dir to use React's `yarn build` version of the command
  - The `railway-copy` command in the rails root 'package.json' copies the production build dir from react-client into the rails public folder to serve up!
    - Note on ZSH/Bash: Normally using '-R' with copy command, one would expect to copy both the directory and the contents! But here the goal is to
      copy JUST the contents of the build dir over not the build dir itself! For that reason, a trailing '/.' is included. The target dir 
      (our rails public dir) doesn't need the trailing slash but it's included for symmetry
      - The '-a' flag used in 'deploy' works similarly! BUT added bonus of copying files EXACTLY as is (file dates and stats preserved)
      - Any files that match in name will be overwritten (source directory version will overwrite the target's version)
  - Ultimately, `railway-deploy` is used to combine 'railway-build' and 'railway-copy' into a simple command for Railway to use.