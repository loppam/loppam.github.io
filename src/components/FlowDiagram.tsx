import type { Diagram } from "../content/site";

export function FlowDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="diagram">
      <p className="diagram-kicker">Diagram</p>
      <p className="diagram-title">{diagram.title}</p>
      <ol>
        {diagram.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <figcaption className="diagram-caption">{diagram.caption}</figcaption>
    </figure>
  );
}
