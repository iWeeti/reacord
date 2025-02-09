---
title: Buttons
description: Using button components
slug: buttons
---

# Buttons

Use the `<Button />` component to create a message with a button, and use the `onClick` callback to respond to button clicks.

```jsx
import { Button } from "reacord"

function Counter() {
	const [count, setCount] = useState(0)

	return (
		<>
			You've clicked the button {count} times.
			<Button label="+1" onClick={() => setCount(count + 1)} />
		</>
	)
}
```

The `onClick` callback receives an `event` object. It includes some information, such as the user who clicked the button, and functions for creating new replies in response. These functions return message instances.

```jsx
import { Button } from "reacord"

function TheButton() {
	function handleClick(event) {
		const name = event.guild.member.displayName || event.user.username

		const publicReply = event.reply(`${name} clicked the button. wow`)
		setTimeout(() => publicReply.destroy(), 3000)

		const privateReply = event.ephemeralReply("good job, you clicked it")
		privateReply.deactivate() // we don't need to listen to updates on this
	}

	return <Button label="click me i dare you" onClick={handleClick} />
}
```

See the [API reference](/api/index.html#ButtonProps) for more information.
