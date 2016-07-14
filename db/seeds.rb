# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


def create_poll
  poll = Poll.create({
      :name => "What is your favourite color?",
      :user_id => 1,
      :lifespan => 604380,
      :votes_per_person => 10,
      :total_votes => 1000,
      :votes_required_per_person => 1,
      :duplicate_votes_allowed => true
                     })
  count = 1
  ['green', 'blue', 'red', 'orange'].each do |color|
    PollSelection.create({
        :poll_id => poll.id,
        :user_id => 1,
        :name => color,
        :vote_count => 0,
        :color => get_color(count)
                         })
    count += 1
  end
end

def get_color count
  color_wheel = [
      "#9e9e9e", #grey
      "#8bc34a", #light green
      "#03a9f4", #light blue
      "#f44336", #red
      "#ff9800", #orange
      "#673ab7", #deep purple
      "#795548", #brown
      "#e91e63", #pink
      "#9c27b0", #purple
      "#4caf50", #green
      "#ffeb3b", #yellow
      "#ffc107", #amber
      "#3f51b5", #indigo
      "#2196f3", #blue
      "#00bcd4", #cyan
      "#009688", #teal
      "#cddc39", #lime
      "#ff5722", #deep orange
      "#607d8b", #blue grey
  ]
  color_wheel[count % color_wheel.length]
end

create_poll
