var JSON_schedule = {
    "No School": [
      {
        "SHours": 0,
        "SMin": 0,
        "EHours": 0,
        "EMin": 0,
        "name": "Passing Period",
        "color": "rgb(100,100,100)",
        "important": false
      },
      {
        "SHours": 0,
        "SMin": 0,
        "EHours": 0,
        "EMin": 0,
        "name": "No School"
      }
    ],
    "Unscheduled": [
      {
        "SHours": 0,
        "SMin": 0,
        "EHours": 0,
        "EMin": 0,
        "name": "Passing Period",
        "color": "rgb(0,0,0)",
        "important": false
      },
      {
        "SHours": 0,
        "SMin": 0,
        "EHours": 0,
        "EMin": 0,
        "name": "Unscheduled"
      }
    ],
    "Red Day": [
      {
        "SHours": 8,
        "SMin": 0,
        "EHours": 8,
        "EMin": 30,
        "name": "Passing Period",
        "color": "rgb(230,0,0)",
        "important": true
      },
      {
        "SHours": 8,
        "SMin": 30,
        "EHours": 9,
        "EMin": 53,
        "name": "Red Period 1 (R1)"
      },
      {
        "SHours": 9,
        "SMin": 53,
        "EHours": 10,
        "EMin": 3,
        "name": "Passing Period"
      },
      {
        "SHours": 10,
        "SMin": 3,
        "EHours": 11,
        "EMin": 25,
        "name": "Red Period 2 (R2)"
      },
      {
        "SHours": 11,
        "SMin": 25,
        "EHours": 11,
        "EMin": 25,
        "name": "Passing Period"
      },
      {
        "SHours": 11,
        "SMin": 25,
        "EHours": 13,
        "EMin": 28,
        "name": "Red Period 3 (R3) & Lunch",
        "lunches": {
          "type": "red",
          "A": [
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 25,
              "name": "Passing Period"
            },
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 55,
              "name": "A Lunch"
            },
            {
              "SHours": 11,
              "SMin": 55,
              "EHours": 12,
              "EMin": 05,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 05,
              "EHours": 13,
              "EMin": 28,
              "name": "Red Period 3 (R3)"
            }
          ],
          "B": [
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 35,
              "name": "Passing Period"
            },
            {
              "SHours": 11,
              "SMin": 35,
              "EHours": 12,
              "EMin": 00,
              "name": "Red Period 3 (R3)"
            },
            {
              "SHours": 12,
              "SMin": 00,
              "EHours": 12,
              "EMin": 00,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 00,
              "EHours": 12,
              "EMin": 30,
              "name": "B Lunch"
            },
            {
              "SHours": 12,
              "SMin": 30,
              "EHours": 12,
              "EMin": 35,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 35,
              "EHours": 13,
              "EMin": 28,
              "name": "Red Period 3 (R3)"
            }
          ],
          "C": [
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 35,
              "name": "Passing Period"
            },
            {
              "SHours": 11,
              "SMin": 35,
              "EHours": 12,
              "EMin": 58,
              "name": "Red Period 3 (R3)"
            },
            {
              "SHours": 12,
              "SMin": 58,
              "EHours": 12,
              "EMin": 58,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 58,
              "EHours": 13,
              "EMin": 28,
              "name": "C Lunch"
            }
          ]
        }
      },
      {
        "SHours": 13,
        "SMin": 28,
        "EHours": 13,
        "EMin": 38,
        "name": "Passing Period"
      },
      {
        "SHours": 13,
        "SMin": 38,
        "EHours": 15,
        "EMin": 0,
        "name": "Red Period 4 (R4)"
      }
    ],
    "Silver Day": [
      {
        "SHours": 8,
        "SMin": 0,
        "EHours": 8,
        "EMin": 30,
        "name": "Passing Period",
        "color": "rgb(100,100,100)",
        "important": true
      },
      {
        "SHours": 8,
        "SMin": 30,
        "EHours": 9,
        "EMin": 53,
        "name": "Silver Period 5 (S5): Targeted Instruction"
      },
      {
        "SHours": 9,
        "SMin": 53,
        "EHours": 10,
        "EMin": 3,
        "name": "Passing Period"
      },
      {
        "SHours": 10,
        "SMin": 3,
        "EHours": 11,
        "EMin": 25,
        "name": "Silver Period 6 (S6)"
      },
      {
        "SHours": 11,
        "SMin": 25,
        "EHours": 11,
        "EMin": 35,
        "name": "Passing Period"
      },
      {
        "SHours": 11,
        "SMin": 35,
        "EHours": 13,
        "EMin": 28,
        "name": "Silver Period 7 (S7) & Lunch",
        "lunches": {
          "type": "silver",
          "A": [
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 25,
              "name": "Passing Period"
            },
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 55,
              "name": "A Lunch"
            },
            {
              "SHours": 11,
              "SMin": 55,
              "EHours": 12,
              "EMin": 05,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 05,
              "EHours": 13,
              "EMin": 28,
              "name": "Silver Period 7 (S7)"
            }
          ],
          "B": [
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 35,
              "name": "Passing Period"
            },
            {
              "SHours": 11,
              "SMin": 35,
              "EHours": 12,
              "EMin": 00,
              "name": "Silver Period 7 (S7)"
            },
            {
              "SHours": 12,
              "SMin": 00,
              "EHours": 12,
              "EMin": 00,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 00,
              "EHours": 12,
              "EMin": 30,
              "name": "B Lunch"
            },
            {
              "SHours": 12,
              "SMin": 30,
              "EHours": 12,
              "EMin": 35,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 35,
              "EHours": 13,
              "EMin": 28,
              "name": "Silver Period 7 (S7)"
            }
          ],
          "C": [
            {
              "SHours": 11,
              "SMin": 25,
              "EHours": 11,
              "EMin": 35,
              "name": "Passing Period"
            },
            {
              "SHours": 11,
              "SMin": 35,
              "EHours": 12,
              "EMin": 58,
              "name": "Silver Period 7 (S7)"
            },
            {
              "SHours": 12,
              "SMin": 58,
              "EHours": 12,
              "EMin": 58,
              "name": "Passing Period"
            },
            {
              "SHours": 12,
              "SMin": 58,
              "EHours": 13,
              "EMin": 28,
              "name": "C Lunch"
            }
          ]
        }
      },
      {
        "SHours": 13,
        "SMin": 28,
        "EHours": 13,
        "EMin": 38,
        "name": "Passing Period"
      },
      {
        "SHours": 13,
        "SMin": 38,
        "EHours": 15,
        "EMin": 0,
        "name": "Silver Period 8 (S8)"
      }
    ]
  }
