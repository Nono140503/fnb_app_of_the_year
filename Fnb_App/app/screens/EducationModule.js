import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const lessons = [
  { title: 'Cash Flow Management', content: 'Track your daily inflows and outflows.' },
  { title: 'Profit Tracking', content: 'Ensure that your revenues exceed your expenses.' },
  { title: 'Budgeting Basics', content: 'Create a budget and stick to it.' },
];

const EducationModule = () => {
  const [currentLesson, setCurrentLesson] = useState(0);

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) setCurrentLesson(currentLesson + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lessons[currentLesson].title}</Text>
      <Text style={styles.content}>{lessons[currentLesson].content}</Text>
      <TouchableOpacity style={styles.button} onPress={nextLesson}>
        <Text style={styles.buttonText}>Next Lesson</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EducationModule;
