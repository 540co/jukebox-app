require 'optparse'
require 'net/http'
require 'json'
require 'uri'

options = {}
op = OptionParser.new do |opts|
  opts.banner = "Usage: slack.rb -c COMPONENT -s STATE -b BRANCH"
  opts.on("-c", "--component COMPONENT", [:frontend], "Component to be deployed: frontend") do |component|
    options[:component] = component
  end
  opts.on("-s", "--state STATE", [:initiated, :success, :failure], "Deployment State: initiated, success, or failure") do |state|
    options[:state] = state
  end
  opts.on("-b", "--branch BRANCH", [:test, :develop, :master], "Deployment Branch: test, develop, or master") do |branch|
    options[:branch] = branch
  end
end

begin op.parse! ARGV
rescue Exception => e
  puts op
  exit
end

@username = nil
@emoji = nil
@color = nil
@title = nil
@text = nil
@link = nil

case options[:component]
when :frontend
  @username = 'JukeboxApp'
  @emoji = ":musical_note:"
end

case options[:branch]
when :test
  @link = '<https://test.jukebox.540.co|TEST>'
when :develop
  @link = '<https://dev.jukebox.540.co|DEV>'
when :master
  @link = '<https://jukebox.540.co|PROD>'
end

case options[:state]
when :initiated
  @color = "#0066FF"
  @title = "Deployment Initiated (#{@link})"
  @text = "#{@username} deployment has been initiated."
when :success
  @color = "#36a64f"
  @title = "Deployment Successful (#{@link})"
  @text = "The latest version of #{@username} has been deployed."
when :failure
  @color = "#e60032"
  @title = "Deployment Successful (#{@link})"
  @text = "The latest version of #{@username} was not deployed successfully."
end

data = {
  channel: "#jukebox",
  username: @username,
  icon_emoji: @emoji,
  attachments: [
    fallback: @text,
    color: @color,
    title: @title,
    text: @text
  ]
}

uri = URI(ENV["SLACK_WEBHOOK_URL"])
req = Net::HTTP::Post.new uri.path
req.body = data.to_json

res = Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  http.request req
end
