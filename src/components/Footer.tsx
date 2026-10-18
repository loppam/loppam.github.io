import { person } from "../content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-row">
        <div>
          <div className="wordmark">LOPAM</div>
          <div>{person.role}</div>
        </div>
        <div className="footer-links">
          <a href={`mailto:${person.email}`}>Email</a>
          <a href={person.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={person.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={person.resume}>Resume</a>
        </div>
      </div>
    </footer>
  );
}
