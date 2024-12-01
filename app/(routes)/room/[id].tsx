import { View, StyleSheet, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams} from 'expo-router';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Call,
  CallContent,
  CallingState,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();
  
  useEffect(() => {
    if (!client || call) return;

    const joinCall = async () => {
      const call = client!.call('default', id);
      await call.join({ create: true });
      setCall(call);
    };

    joinCall();
  }, [call]);

  useEffect(() => {
    if (call?.state.callingState !== CallingState.LEFT) {
      call?.leave();
    }
  }, [call])

  if (!call) return (
    <View style={{ flex: 1 }}>
    <Spinner visible={!call} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StreamCall call={call}>
        <View style={styles.container}>
          <CallContent
            onHangupCallHandler={() => router.back()}
          />
        </View>
      </StreamCall>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
  },

  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Page;
