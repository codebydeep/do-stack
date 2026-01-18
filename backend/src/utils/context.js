export function buildContext(project, issues) {
  return `
Project Name: ${project.name}
Description: ${project.description}

Team Members:
${project.members.map(m => `- ${m.name} (${m.role})`).join("\n")}

Issues:
${issues.map(i =>
  `- ${i.title} | Category: ${i.category} | Assignee: ${i.assignee?.name || "Unassigned"}`
).join("\n")}
`;
}
