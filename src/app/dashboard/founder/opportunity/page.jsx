import React from 'react';
import { getOpportunities } from '@/lib/api/opportunity';
import { Chip, Table, Button, Tooltip } from "@heroui/react";
// Importing typical gravity icons. Adjust paths if your package setup differs.
import { Video, Pencil, TrashBin} from "@gravity-ui/icons";

const OpportunityPage = async () => {
    const companyId = "company_123";
    const opportunities = await getOpportunities(companyId); 

    // Helper to style status chips nicely
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'success';
            case 'inactive': return 'danger';
            default: return 'default';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Company Opportunities</h1>
            
            <Table aria-label="Company Opportunities Table">
                <Table.ResizableContainer>
                    <Table.Content aria-label="Table with resizable columns" className="min-w-200">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="1.5fr" id="roleTitle" minWidth={180}>
                                Role Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.5fr" id="skills" minWidth={180}>
                                Required Skills
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="type" minWidth={140}>
                                Type & Commitment
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="location" minWidth={120}>
                                Location
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="actions" minWidth={150}>
                                Actions
                            </Table.Column>
                        </Table.Header>
                        
                        <Table.Body emptyContent={"No opportunities found."}>
                            {opportunities.map((item) => (
                                <Table.Row key={item._id?.$oid || item._id}>
                                    {/* Role Title */}
                                    <Table.Cell className="font-medium text-default-700">
                                        {item.roleTitle}
                                    </Table.Cell>

                                    {/* Required Skills */}
                                    <Table.Cell>
                                        <span className="text-default-600 text-sm">
                                            {item.requiredSkills}
                                        </span>
                                    </Table.Cell>

                                    {/* Work Type & Commitment */}
                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="capitalize text-sm font-medium">{item.workType}</span>
                                            <span className="text-xs text-default-400 capitalize">{item.commitmentLevel}</span>
                                        </div>
                                    </Table.Cell>

                                    {/* Location */}
                                    <Table.Cell>
                                        <div className="flex flex-col">
                                            <span className="capitalize text-sm">{item.location}</span>
                                            {item.isRemote && (
                                                <span className="text-xs text-success font-medium">Remote Available</span>
                                            )}
                                        </div>
                                    </Table.Cell>

                                    {/* Status */}
                                    <Table.Cell>
                                        <Chip color={getStatusColor(item.status)} size="sm" variant="soft" className="capitalize">
                                            {item.status || "Unknown"}
                                        </Chip>
                                    </Table.Cell>

                                    {/* Actions Row */}
                                    <Table.Cell>
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content="Video Details">
                                                <Button isIconOnly size="sm" variant="light" aria-label="Video Details">
                                                    <Video className="text-default-500" width={16} height={16} />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Edit Opportunity">
                                                <Button isIconOnly size="sm" variant="light" aria-label="Edit">
                                                    <Pencil className="text-default-500" width={16} height={16} />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Delete Opportunity" color="danger">
                                                <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete">
                                                    <TrashBin className="text-danger" width={16} height={16} />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default OpportunityPage;