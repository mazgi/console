interface AppQueue {
  enqueue: () => string | Promise<string>
}

export default AppQueue
