@extends('inc.layout')
 
@section('content') 
 
<div id="frame">
    <div id="sidepanel">
        <div id="profile">
            <div class="wrap">
                <img id="profile-img" src="{{asset('uploads/avatar/')}}/{{Auth::user()->avatar }}" class="online" alt="" /> 
            </div>
        </div> 

        <hr style="width: 80%; border: 1px solid #ccc ">
        
        <div id="contacts">
            <ul id="onlin"> 
            </ul>
        </div>
         
    </div>
    <div class="content">
        <div class="contact-profile">
            <img src="{{asset('uploads/avatar/')}}/{{Auth::user()->avatar }}" alt="" />
            <p>{{ auth()->user()->name}}</p> 
        </div>    
        <div class="messages">
            <ul> 
                @foreach($messages as $message) 
                   <li class="{{ auth()->user()->id == $message->sender_id ? 'sent' : 'replies'}}">
                        <img src="{{asset('uploads/avatar/')}}/{{$message->user->avatar }}" alt="" /> 
                        <div>  
                            <p> <span> {{$message->user->name}}: </span> {{$message->body}} </p>
                        </div>
                   </li> 
                @endforeach 
            </ul>
        </div>
        <div class="message-input">
            <div class="wrap">
            <input type="text" placeholder="Write your message..." /> 
            <button id="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>
        </div>
    </div>
</div>
@endsection
