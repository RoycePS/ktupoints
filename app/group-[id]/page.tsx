import Link from "next/link";
import data from "../../data/activity-points.json";

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
    ];
}

export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const groupId = `GROUP_${id === "1" ? "I" : id === "2" ? "II" : "III"}`;
    const group = data.groups.find((g) => g.groupId === groupId);

    if (!group) return <div>Group not found</div>;

    return (
        <div>
            <Link href="/">Back to Home</Link>
            <h1>{group.groupName} (Group {id})</h1>

            {group.categories.map((category) => (
                <div key={category.categoryId}>
                    <h2>{category.categoryName}</h2>
                    <ul>
                        {category.activities.map((activity) => (
                            <li key={activity.code}>
                                <Link href={`/activity/${activity.code}`}>
                                    <strong>{activity.code}</strong>: {activity.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
