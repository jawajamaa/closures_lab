# **Closures and State Updates in React**
Closures can be hard to understand. I remember when I was going through my coding bootcamp and I was introduced to them, I didn't really get what it was they were trying to teach me. Part of the problem was that I wasn’t shown how they can cause issues in our code and how our solutions fix these problems.

Understanding closures and their role in JavaScript can be challenging, especially when paired with React’s state management. In a broad sense, closures allow functions to "remember" the values from their surrounding environment at the time of execution. This feature is very helpful but can sometimes lead to unexpected behavior.

In this lab, we’ll explore how closures can cause issues in asynchronous functions and how understanding their behavior helps us correctly manage state in React.

## **The Counter Problem**

I’ve set up a simple counter application where pressing a button increments the count by 1. To make things more interesting, I want to introduce a **1-second delay** before updating the counter.

> **Side Note:** What happens if we try `counter++` or `counter += 1` in the setter function?  
> Spoiler: It doesn’t work as you might expect. Play around with it on your own, and check the [footnote](#footnote) for more details!

We can use JavaScript's built-in [**setTimeout**](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout), which takes a callback function and a delay in milliseconds. The callback contains the logic we want to execute when the timer runs out—in this case, our `setCounter` function.

```javascript
const handleClick = () => {
  setTimeout(() => {
    setCounter(counter + 1)
}, 1000)
}
```

At first glance, this works perfectly: **press the button once, wait a second, and the counter increases.** Success!

But what happens if you press the button three times quickly?

**Hmmm...**

The counter doesn’t update as expected. This is because of a problem known as a **stale closure**.

## **Debugging the Issue**

To figure out where the code is breaking, I like to start from the outside and work inward:

### 1. **Verify the Click Handler:**
Add a `console.log` inside your click handler to confirm that it runs each time you press the button. You should see it log for each button click, regardless of when the `setTimeout` callback runs. So, we know the click is working—let’s go further in.

```javascript
const handleClick = () => {
  console.log('Button clicked!');
  setTimeout(() => {
    setCounter(counter + 1)
}, 1000)
}
```

### 2. **Check the Timer:**
Add another `console.log` inside the `setTimeout` callback to verify that the function executes after the delay.

Once both logs confirm the clicks and the timer, it becomes clear that the issue lies with the state update in the setter function.

```javascript
const handleClick = () => {
  setTimeout(() => {
    console.log('setTimeout ran!');
    setCounter(counter + 1)
}, 1000)
}
```

<br><br>
At this point, I encourage you to pause and try to find the solution to this issue. React developers have already accounted for problems like this, and there’s a simple, built-in solution. When you are ready to move on, I’ll explain what’s happening in our code, what the solution is, and why it works.

---
---
<br><br>
In our broken code, when the setTimeout function is called, it creates a closure around the state at the time it’s invoked. If you press the button multiple times within that 1-second interval, each setTimeout callback holds onto the value of the counter at the time of its creation. As a result, every callback refers to the same outdated value of the counter, failing to account for additional clicks. So when it updates, it only looks like it updates once. Be aware, though, that the state is technically updating multiple times—it’s just using the wrong value.

React provides a built-in solution to this issue: functional updates, or using what we call previous state. In React, the setter function for a state value can take a callback function as its argument. This callback receives the previous state (prevState) as an argument, ensuring the update is based dynamically on the most current value of the counter at the time the state is updated—not the stale closure.

```javascript
const handleClick = () => {
  setTimeout(() => {
    setCounter(prevState => prevState + 1)
}, 1000)
}
```

Here’s why this works: By using prevState, the closure is now created around the callback function instead of the state variable. This means React calculates the current state value at the exact moment the callback executes, avoiding reliance on a stale snapshot. When the callback is eventually executed (e.g., after the setTimeout delay), it accesses the most current state value. This ensures React calculates the updated state dynamically, resolving the stale closure issue and allowing the behavior to work as expected, even with asynchronous calls.

<br><br>

### Footnote

React enforces immutability for state, meaning you can't directly modify state variables like `counter`. When we try to use `setCounter(counter++)` or `setCounter(counter += 1)`, we are directly modifying the state variable itself, which React prevents to maintain control over state updates. On the other hand, using `setCounter(counter + 1)` references the current state value to calculate a new one, ensuring React processes the update correctly and triggers a re-render.

