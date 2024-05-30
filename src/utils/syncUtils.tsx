import axios from 'axios';

const synchronizeDataWithServer = async () => {
    try {
        const dbName = 'userData';
        const db = indexedDB.open(dbName);
        db.onsuccess = () => {
            const transaction = db.result.transaction('users', 'readwrite');
            const objectStore = transaction.objectStore('users');

            const getAllRecordsRequest = objectStore.getAll();
            getAllRecordsRequest.onsuccess = async () => {
                const allUsers = getAllRecordsRequest.result;
                for (const user of allUsers) {
                    if (user.isNew) {
                        await axios.post('http://localhost:8080/users', user);
                    } else if (user.isUpdated) {
                        await axios.put(
                            `http://localhost:8080/users/${user.userId}`,
                            user,
                        );
                    } else if (user.isDeleted) {
                        await axios.delete(
                            `http://localhost:8080/users/${user.userId}`,
                        );
                    }
                }

                const clearRequest = objectStore.clear();
                clearRequest.onsuccess = () => {
                    console.log('IndexedDB cleared after synchronization');
                };
            };
        };
    } catch (error) {
        console.error('Error synchronizing data with server:', error);
    }
};

const checkNetworkAndSyncData = () => {
    if (navigator.onLine) {
        synchronizeDataWithServer();
    }
};

window.addEventListener('online', checkNetworkAndSyncData);
export default checkNetworkAndSyncData;
