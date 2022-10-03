export default function NewJokeRoute() {
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post"></form>
      <div>
        <label>
          Name: <input type="text" name="name" />
        </label>
      </div>
      <div>
        <label>
          Content: <textarea name="content"></textarea>
        </label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </div>
  );
}
