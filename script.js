document.getElementById('scanButton').addEventListener('click', async () => {
    console.log('Scan button clicked'); // Log when the button is clicked

    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Scanning for beacons...';

    try {
        console.log('Requesting Bluetooth device with specific UUIDs...');
        const device = await navigator.bluetooth.requestDevice({
            filters: [
                { services: ['00001800-0000-1000-8000-00805f9b34fb'] },
                { services: ['0000180a-0000-1000-8000-00805f9b34fb'] },
                { services: ['00001801-0000-1000-8000-00805f9b34fb'] }
            ]
        });

        console.log('Device selected:', device);

        const deviceName = device.name || 'Unknown Device';

        const messages = {
            'ENTRANCE': 'You have reached entrance of J414, go inside to reach the location',
            'DESTINATION': 'Congrats you have reached destination',
            'START': 'You are at the corridor, move straight to reach entrance',
        };

        const advertisementMessage = messages[deviceName] || `Beacon detected: ${deviceName}`;
        messageElement.textContent = advertisementMessage;

        alert(advertisementMessage);

    } catch (error) {
        console.error('Error during Bluetooth device request:', error);
        messageElement.textContent = 'Failed to detect beacons. Check the console for more details.';
    }
});
