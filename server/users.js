/**
 * Created by dxs on 2015-06-17.
 */
Meteor.publish("users",function(){

    return Meteor.users.find({},{fields:{emails:1,profile:1}})
})
