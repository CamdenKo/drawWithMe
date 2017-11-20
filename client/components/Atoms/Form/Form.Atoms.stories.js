import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Button,
} from '../Form'

storiesOf('Atoms/Form', module)
  .add('Button', () => <Button>TEXT</Button>)
