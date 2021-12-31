import { Project } from "../domain/project";

export function expectProjectsEqual(expected: Project, actual: Project) {
    expect(actual.id).toBe(expected.id);
    expect(actual.name).toEqual(expected.name);
    expect(actual.description).toEqual(expected.description);
    expect(actual.columns).toBe(expected.columns);
    expect(actual.createdAt).toEqual(expected.createdAt);
}
