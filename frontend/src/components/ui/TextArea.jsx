export default function TextArea({setExtraInstructions}) {
  return (
    <textarea
      className="ui-textarea"
      onChange={(e) => setExtraInstructions(e.target.value)}
    ></textarea>
  );
}
