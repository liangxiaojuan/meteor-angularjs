/**
 * Created by dxs on 2015-06-17.
 */

Meteor.publish("parties", function (options,searchString) {
    if(searchString == null)
        searchString = "";
    Counts.publish(this,'numberOfParties',Parties.find({
        'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        $or:[
            {$and:[
                {"publuc":true},
                {"publuc":{$exists: true}}
            ]},
            {$and:[
                {owner:this.userId},
                {owner:{$exists:true}}
            ]}
        ]
    }),{noEeady: true});
    return Parties.find({
        'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        $or:[
            {$and:[
                {"public": true},
                {"public": {$exists: true}}
            ]},
            {$and:[
                {owner: this.userId},
                {owner: {$exists: true}}
            ]}
        ]},options);
});
