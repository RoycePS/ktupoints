import Link from "next/link";
import dataFromFile from "../../../data/activity-points.json";

const data = dataFromFile as any;

export async function generateStaticParams() {
    const params = [];
    for (const group of data.groups) {
        for (const category of group.categories) {
            for (const activity of category.activities) {
                params.push({ code: activity.code });
            }
        }
    }
    return params;
}

export default async function ActivityPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const decodedCode = decodeURIComponent(code);

    let foundActivity: any = null;
    let groupName = "";

    for (const group of data.groups) {
        for (const category of group.categories) {
            for (const activity of category.activities) {
                if (activity.code === decodedCode) {
                    foundActivity = activity;
                    groupName = group.groupName;
                    break;
                }
            }
        }
    }

    if (!foundActivity) return <div>Activity not found</div>;

    return (
        <div>
            <Link href="/">Back to Home</Link>
            <h1>{foundActivity.title}</h1>
            <p>Code: {foundActivity.code}</p>
            <p>Group: {groupName}</p>

            {foundActivity.points && <p>Points: {foundActivity.points}</p>}
            {foundActivity.maxPoints && <p>Max Points: {foundActivity.maxPoints}</p>}
            {foundActivity.proof && <p>Proof: {foundActivity.proof}</p>}

            {foundActivity.levels && (
                <div>
                    <h3>Levels</h3>
                    <ul>
                        {Object.entries(foundActivity.levels).map(([level, points]) => (
                            <li key={level}>{level}: {points as number}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
