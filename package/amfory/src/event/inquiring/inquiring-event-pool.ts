import type { EventPool } from '@yellfage/events'

import type { InquiringEventHandler } from './inquiring-event-handler'

export interface InquiringEventPool extends EventPool<InquiringEventHandler> {}
