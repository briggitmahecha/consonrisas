class EventsController < ApplicationController
  before_filter :authenticate_member!, :except => [:index, :show]
  # GET /events
  # GET /events.xml
  def index
    @events = Event.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @events }
    end
  end

  # GET /events/1
  # GET /events/1.xml
  def show
    @event = Event.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @event }
    end
  end

  # GET /events/new
  # GET /events/new.xml
  def new
    @event = Event.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @event }
    end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
  end

  # POST /events
  # POST /events.xml
  def create
    @event = Event.new(params[:event])
    if params[:fundation_id]
      fundation = Fundation.find(params[:fundation_id]) 
      @event.fundations.push(fundation)
    end
    respond_to do |format|
      if @event.save
        EventAdmin.create(:member_id =>params[:member_id], :event_id => @event.id, :active=>true)
        format.html { redirect_to(@event, :notice => 'Event was successfully created.') }
        format.xml  { render :xml => @event, :status => :created, :location => @event }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @event.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /events/1
  # PUT /events/1.xml
  def update
    @event = Event.find(params[:id])

    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.html { redirect_to(@event, :notice => 'Event was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @event.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.xml
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    respond_to do |format|
      format.html { redirect_to(events_url) }
      format.xml  { head :ok }
    end
  end
  
  def add_provider 
    @event = Event.find(params[:event_id])
    @provider = Provider.find(params[:provider_id])
    @event.providers.push(@provider)
    redirect_to event_path(@event)
  end
  
  def add_facilitator
    @event = Event.find(params[:event_id])
    @facilitator = Facilitator.find(params[:facilitator_id])
    @event.facilitators.push(@facilitator)
    respond_to do |format|
#      format.html {redirect_to event_path(@event)}
      format.js {head:ok}
    end

  end
  
  def add_fundation
    @event = Event.find(params[:event_id])
    @fundation = Fundation.find(params[:fundation_id])
    @event.fundations.push(@fundation)
    redirect_to event_path(@event)
  end  
  
  def remove_provider 
    @event = Event.find(params[:event_id])
    @provider = Provider.find(params[:provider_id])
    @event.providers.delete(@provider)
    redirect_to event_path(@event)
  end
  
  def remove_facilitator
    @event = Event.find(params[:event_id])
    @facilitator = Facilitator.find(params[:facilitator_id])
    @event.facilitators.delete(@facilitator)
    respond_to do |format|
      format.js {head:ok}
    end
  end
  
  def remove_fundation
    @event = Event.find(params[:event_id])
    @fundation = Fundation.find(params[:fundation_id])
    @event.fundations.delete(@fundation)
    redirect_to event_path(@event)
  end    
  
  
  def add_show
    @event = Event.find(params[:event_id])
    @show = Show.find(params[:show_id])
    @event.shows.push(@show)
    redirect_to event_path(@event)    
  end
  
  def ask_admin
    event = Event.find(params[:event_id])
    event.ask_admin params[:member_id] if params[:member_id].to_s != "-1" and params[:member_id].to_s != ""
    event.ask_admin_by_mail params[:mail] if params[:mail].to_s != "mail" and params[:mail].to_s != ""
    respond_to do |format|
      format.js {head :ok}
    end
  end  
  
end
