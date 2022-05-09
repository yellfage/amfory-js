import type { EventChannel } from '@yellfage/events'

import type { InquiringEventHandler } from '../../event'

export interface InquiringEventChannel
  extends EventChannel<InquiringEventHandler> {}
