//Corrected backgroundTasks.js
import * as TaskManager from 'expo-task-manager';

TaskManager.defineTask('MY_BACKGROUND_TASK', async ({ data, error }) => {
  if (error) {
    console.error('Background task error:', error);
    return;
  }
  console.log('Background task running with data:', data);
  try {
    // Perform your task here with robust error handling
     // Example: Fetching data from an API
     const response = await fetch('YOUR_API_ENDPOINT');
     const jsonData = await response.json();
     console.log('API data:', jsonData);
  } catch (fetchError) {
     console.error('Error fetching data:', fetchError);
  }
});

//In your App.js
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from 'react';

export default function App() {
  const [taskStarted, setTaskStarted] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const result = await TaskManager.startTaskAsync('MY_BACKGROUND_TASK', { someData: 'test' });
        setTaskStarted(result);
      } catch (e) {
        console.error("Error starting task:",e);
      }
    })();
  }, []);
  return (
    <View>
       {taskStarted && <Text>Background task started</Text>}
    </View>
  );
}
//Ensure you have the necessary permissions in your app.json