var JSON_sched = {
  "test":[
    {"color":"rgb(255,0,0)"},
    {
      "ST":"12:00",
      "ET":"12:01",
      "hasSub":false,
      "sub":{},
      "name":"1st Period"
    },
    {
      "ST":"12:01",
      "ET":"12:02",
      "hasSub":true,
      "sub":{
        "A Lunch":[{
          "ST":"12:02",
          "ET":"12:15",
          "name":"A"
        },
        {
          "ST":"12:15",
          "ET":"12:20",
          "name":"Passing Period"
        },
        {
          "ST":"12:20",
          "ET":"12:30",
          "name":"Remaining Class A"
        }
      ],
      "B Lunch":[
        {
          "ST":"12:10",
          "ET":"12:25",
          "name":"B"
        },
        {
          "ST":"12:25",
          "ET":"12:30",
          "name":"Remaining Class B 2"
        }
      ],

    },
      "name":"Passing Period"
    },
    {
      "ST":"12:02",
      "ET":"12:30",
      "name": "2nd Period",
      "hasSub":true,
      "sub":{
        "A":[{
          "ST":"12:02",
          "ET":"12:15",
          "name":"A"
        },
        {
          "ST":"12:15",
          "ET":"12:20",
          "name":"Passing Period"
        },
        {
          "ST":"12:20",
          "ET":"12:30",
          "name":"Remaining Class A"
        }
      ],
      "B":[
        {
          "ST":"12:10",
          "ET":"12:25",
          "name":"B"
        },
        {
          "ST":"12:25",
          "ET":"12:30",
          "name":"Remaining Class B 2"
        }
      ],

    }
  }
],



  "No School":[
    {"color":"rgb(100,100,100)"},
    {
      "ST":"00:00",
      "ET":"00:00",
      "name":"No School",
      "hasSub": false,
      "sub":{}
    }
  ],
  "Unscheduled":[
    {"color":"rgb(0,0,0)"},
    {
      "ST":"00:00",
      "ET":"00:00",
      "name":"Unscheduled",
      "hasSub": false,
      "sub":{}
    }
  ],
  "Red Day":[
    {"color":"rgb(255,0,0)"},
    {
      "ST":"08:00",
      "ET":"08:30",
      "name":"Passing Period",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"08:30",
      "ET":"09:53",
      "name":"Red Period 1",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"09:53",
      "ET":"10:03",
      "name":"Passing Period",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"10:03",
      "ET":"11:25",
      "name":"Red Period 2",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"11:25",
      "ET":"13:28",
      "name":"Red Period 3 & Lunch",
      "hasSub": true,
      "sub":{
          "A":[
            {
              "ST":"11:25",
              "ET":"11:55",
              "name":"A Lunch"
            },
            {
              "ST":"11:55",
              "ET":"12:05",
              "name":"Passing Period"
            },
            {
              "ST":"12:05",
              "ET":"13:28",
              "name":"Red Period 3"
            }
          ],
          "B":[
            {
              "ST":"11:25",
              "ET":"11:35",
              "name":"Passing Period"
            },
            {
              "ST":"11:35",
              "ET":"12:10",
              "name":"Red Period 3"
            },
            {
              "ST":"12:10",
              "ET":"12:40",
              "name":"B Lunch"
            },
            {
              "ST":"12:40",
              "ET":"12:45",
              "name":"Passing Period"
            },
            {
              "ST":"12:45",
              "ET":"13:28",
              "name":"Red Period 3"
            }
          ],
          "C":[
            {
              "ST":"11:25",
              "ET":"11:35",
              "name":"Passing Period"
            },
            {
              "ST":"11:35",
              "ET":"12:58",
              "name":"Red Period 3"
            },
            {
              "ST":"12:58",
              "ET":"13:28",
              "name":"C Lunch"
            }
          ]
      }
    },
    {
      "ST":"13:28",
      "ET":"15:00",
      "name":"Period 4",
      "hasSub": false,
      "sub":{}
    }
  ],
  "Silver Day":[
    {"color":"rgb(200,200,200)"},
    {
      "ST":"08:00",
      "ET":"08:30",
      "name":"Passing Period",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"08:30",
      "ET":"09:53",
      "name":"Silver Period 1",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"09:53",
      "ET":"10:03",
      "name":"Passing Period",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"10:03",
      "ET":"11:25",
      "name":"Silver Period 2",
      "hasSub": false,
      "sub":{}
    },
    {
      "ST":"11:25",
      "ET":"13:28",
      "name":"Silver Period 3 & Lunch",
      "hasSub": true,
      "sub":{
          "A":[
            {
              "ST":"11:25",
              "ET":"11:55",
              "name":"A Lunch"
            },
            {
              "ST":"11:55",
              "ET":"12:05",
              "name":"Passing Period"
            },
            {
              "ST":"12:05",
              "ET":"13:28",
              "name":"Silver Period 3"
            }
          ],
          "B":[
            {
              "ST":"11:25",
              "ET":"11:35",
              "name":"Passing Period"
            },
            {
              "ST":"11:35",
              "ET":"12:10",
              "name":"Silver Period 3"
            },
            {
              "ST":"12:10",
              "ET":"12:40",
              "name":"B Lunch"
            },
            {
              "ST":"12:40",
              "ET":"12:45",
              "name":"Passing Period"
            },
            {
              "ST":"12:45",
              "ET":"13:28",
              "name":"Silver Period 3"
            }
          ],
          "C":[
            {
              "ST":"11:25",
              "ET":"11:35",
              "name":"Passing Period"
            },
            {
              "ST":"11:35",
              "ET":"12:58",
              "name":"Silver Period 3"
            },
            {
              "ST":"12:58",
              "ET":"13:28",
              "name":"C Lunch"
            }
          ]
      }
    },
    {
      "ST":"13:28",
      "ET":"15:00",
      "name":"Silver Period 4",
      "hasSub": false,
      "sub":{}
    }
  ]
}
