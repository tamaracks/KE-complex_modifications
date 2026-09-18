// JavaScript should be written in ECMAScript 5.1.

function main() {
  var functionKeys = [
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
    'f10',
    'f11',
    'f12',
  ]

  console.log(
    JSON.stringify(
      {
        title: 'Fn Lock: toggle function-key mode with Fn+Esc',
        rules: [
          {
            description: 'Fn+Esc toggles Fn Lock for the top row',
            manipulators: [
              {
                type: 'basic',
                from: {
                  key_code: 'fn',
                  modifiers: {
                    optional: ['any'],
                  },
                },
                to: [
                  {
                    key_code: 'fn',
                    lazy: true,
                  },
                ],
                to_if_alone: [{ key_code: 'fn' }],
              },
              makeToggleManipulator('variable_unless', 1, 'Fn Lock On', 1),
              makeToggleManipulator('variable_if', 1, 'Fn Lock Off', 0),
            ].concat(
              functionKeys.map(function (keyCode) {
                return makeFunctionKeyManipulator(keyCode)
              })
            ),
          },
        ],
      },
      null,
      '  '
    )
  )
}

function makeToggleManipulator(conditionType, conditionValue, message, value) {
  return {
    type: 'basic',
    conditions: [
      {
        type: conditionType,
        name: 'fn_lock',
        value: conditionValue,
      },
    ],
    from: {
      key_code: 'escape',
      modifiers: {
        mandatory: ['fn'],
        optional: ['any'],
      },
    },
    to: [
      {
        set_notification_message: {
          id: 'fn_lock_status',
          text: message,
          duration_milliseconds: 800,
        },
      },
      {
        set_variable: {
          name: 'fn_lock',
          value: value,
        },
      },
    ],
  }
}

function makeFunctionKeyManipulator(keyCode) {
  return {
    type: 'basic',
    conditions: [
      {
        type: 'variable_if',
        name: 'fn_lock',
        value: 1,
      },
    ],
    from: {
      key_code: keyCode,
      modifiers: {
        optional: ['any'],
      },
    },
    to: [
      {
        key_code: keyCode,
        modifiers: ['fn'],
      },
    ],
  }
}

main()
