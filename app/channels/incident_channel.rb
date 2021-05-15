class IncidentChannel < ApplicationCable::Channel
  def subscribed
    stream_from "incidents"
  end
end