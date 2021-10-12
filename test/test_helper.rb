ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'test_helpers/redirect_assertions'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors) #? Default grabs # of cores on your computer to parallelize work
  #? Any # above 1 will begin making copies of your test db (testdb-0, testdb-1, etc...)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

#? Classes that inherit from below class get methods from included modules making adding test helpers easy!
class ActionDispatch::IntegrationTest
  include RedirectAssertions
end
