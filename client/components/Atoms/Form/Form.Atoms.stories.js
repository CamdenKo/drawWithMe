import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Button,
  TextInput,
  SpecialTextInput,
} from '../Form'

storiesOf('Atoms/Form', module)
  .add('Button', () => <Button>TEXT</Button>)
  .add('TextInput', () => <TextInput value="asdf" />)
  .add('SpecialTextInput', () => <SpecialTextInput size="8" maxLength="6" />)
