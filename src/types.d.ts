import type { useCollectionsStore } from '../../../../app/src/stores/collections'
import type {useRelationsStore} from '../../../../app/src/stores/relations'
import type {useFieldsStore} from '../../../../app/src/stores/fields'

declare module '@directus/extensions-sdk' {
    export function useStores(): {
        useCollectionsStore: typeof useCollectionsStore;
        useRelationsStore: typeof useRelationsStore;
        useFieldsStore: typeof useFieldsStore;
    }
}
