var JSON_sched = {
  "TestA" :[
    {
      "color" : "rgb(0,0,0)",
      "position" : 0,
      "ID": "AAAAAA"
    },
    {
      "name" : "First",
      "ID" : "11111",
      "startTimeDigits" : "08:00",
      "startTime" : 28800,
      "endTimeDigits" : "08:10",
      "endTime" : 29400,
      "intraschedule" : null,
      "intraindex" : -1
    },
    {
      "name" : "Second",
      "ID" : "11112",
      "startTimeDigits" : "21:18",
      "startTime" : 76680,
      "endTimeDigits" : "21:20",
      "endTime" : 76800,
      "intraschedule" : {
        "Sub1" : [
          {
            "name" : "SecondSub",
            "ID" : "11112",
            "startTimeDigits" : "21:18",
            "startTime" : 76680,
            "endTimeDigits" : "21:19",
            "endTime" : 76740,
          },

          {
            "name" : "SecondSub",
            "ID" : "11112",
            "startTimeDigits" : "21:19",
            "startTime" : 76740,
            "endTimeDigits" : "21:20",
            "endTime" : 76800,
          }
        ]
      },
     "intraindex" : -1
    }
  ],
  "Test" : [
    {
      "color" : "rgb(0,0,0)",
      "position" : 0,
      "ID" : "AAAAAA"
    },
    {
      "name" : "First Period",
      "ID" : "111111",
      "startTimeDigits" : "00:00",
      "startTime" : 0,
      "endTimeDigits" : "00:01",
      "endTime" : 60,
      "intraschedule" : null,
      "intraindex" : -1
    },
    {
      "name" : "Second Period",
      "ID" : "111111",
      "startTimeDigits" : "00:01",
      "startTime" : 60,
      "endTimeDigits" : "00:03",
      "endTime" : 180,
      "intraschedule" : {
        "2,1" : [
          {
            "name" : "Part 2,1,1",
            "ID" : "aaa",
            "startTimeDigits" : "00:01",
            "startTime" : 60,
            "endTimeDigits" : "00:02",
            "endTime" : 120
          },
          {
            "name" : "Part 2,1,2",
            "ID" : "aaa",
            "startTimeDigits" : "00:02",
            "startTime" : 120,
            "endTimeDigits" : "00:03",
            "endTime" : 180,
          }
        ],
        "2,2" : [
          {
            "name" : "Part 2,2,1",
            "ID" : "aaa",
            "startTimeDigits" : "00:01",
            "startTime" : 60,
            "endTimeDigits" : "00:02",
            "endTime" : 120
          },
          {
            "name" : "Part 2,2,2",
            "ID" : "aaa",
            "startTimeDigits" : "00:02",
            "startTime" : 120,
            "endTimeDigits" : "00:03",
            "endTime" : 180,
          }
        ]
      },
      "intraindex" : -1
    },
    {
      "name" : "Third Period",
      "ID" : "111111",
      "startTimeDigits" : "00:03",
      "startTime" : 180,
      "endTimeDigits" : "00:04",
      "endTime" : 240,
      "intraschedule" : null,
      "intraindex" : -1
    }
  ]
}
