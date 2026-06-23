"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Switch,
    Button,
    toast
} from "@heroui/react";
import { Briefcase, Globe } from "@gravity-ui/icons";

import { redirect } from "next/navigation";
import { createOpportunity } from "@/lib/actions/Opportunity";

export default function PostJobPage() {
    // Mock configuration for recruiter's authenticated state
    const [mockCompany] = useState({
        name: "Acme Corp (Auto-filled)",
        id: "company_123",
        isApproved: true,
    });

    const [isRemote, setIsRemote] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mockCompany.isApproved) {
            alert("Your company profile must be approved before you can post jobs.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.roleTitle) newErrors.roleTitle = "Role title is required";
        if (!data.requiredSkills) newErrors.requiredSkills = "Required skills are required";
        if (!data.workType) newErrors.workType = "Work type is required";
        if (!data.commitmentLevel) newErrors.commitmentLevel = "Commitment level is required";
        if (!isRemote && !data.location) newErrors.location = "Location is required for non-remote roles";
        if (!data.deadline) newErrors.deadline = "Application deadline is required";
        
        console.log("Validation errors:", newErrors);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            isRemote,
            companyId: mockCompany.id,
            status: "active",
            isPubliclyVisible: true,
        };

        const res = await createOpportunity(payload);
        if (res.insertedId) {
            toast.success("Opportunity posted successfully!");
            e.target.reset();
            setIsRemote(false);
            redirect("/dashboard/founder");
        }
    };

    // Clean pure white inputs with slight soft backgrounds on hover
    const textInputClass = "w-full text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-50 focus:border-zinc-400 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-400 outline-none transition-all";
    const textAreaClass = "w-full text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-50 focus:border-zinc-400 rounded-lg p-3 text-sm placeholder:text-zinc-400 outline-none transition-all";

    const selectBoxClass = "w-full";
    const triggerClasses = "w-full flex items-center justify-between bg-white border border-zinc-200 hover:bg-zinc-50 h-12 rounded-lg px-3 text-zinc-900 transition-all text-sm outline-none data-[focused=true]:border-zinc-400 data-[invalid=true]:border-danger";
    const popoverClasses = "bg-white border border-zinc-200 text-zinc-900 rounded-lg shadow-lg p-1";
    const listItemClasses = "flex items-center justify-between p-2 rounded-md hover:bg-zinc-100 cursor-pointer text-sm text-zinc-700 outline-none data-[focused=true]:bg-zinc-100";

    return (
        <div className="min-h-screen bg-white text-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-zinc-100 rounded-xl p-8 shadow-sm">

                {/* Form Header block */}
                <div className="border-b border-zinc-100 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Add Opportunity</h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        Fill out the fields below to add a new opportunity to Startup Forge.
                    </p>

                    {/* Company verification status panel */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-1.5 text-xs text-zinc-600">
                        <Briefcase size={14} className="text-zinc-400" />
                        Posting as: <span className="font-semibold text-zinc-700">{mockCompany.name}</span>
                        <span className="text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Approved</span>
                    </div>
                </div>

                {/* Hero UI Main Form Handler */}
                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior='aria'>

                    {/* SECTION 1: Opportunity Details */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-800 border-b border-zinc-100 w-full pb-2 mb-2">
                            Opportunity Details
                        </legend>

                        <div className="grid grid-cols-1 gap-6">
                            <TextField name="roleTitle" isInvalid={!!errors.roleTitle} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-600 font-medium text-sm">Role Title</Label>
                                <Input placeholder="e.g. Full Stack Developer, Marketing Intern" className={textInputClass} />
                                {errors.roleTitle && <FieldError className="text-xs text-danger mt-1">{errors.roleTitle}</FieldError>}
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <TextField name="requiredSkills" isInvalid={!!errors.requiredSkills} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-600 font-medium text-sm">Required Skills</Label>
                                <TextArea
                                    placeholder="e.g. React, Node.js, UI/UX Design, Growth Hacking (comma separated)"
                                    rows={3}
                                    className={textAreaClass}
                                />
                                {errors.requiredSkills && <FieldError className="text-xs text-danger mt-1">{errors.requiredSkills}</FieldError>}
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select className={selectBoxClass} name="workType" isInvalid={!!errors.workType}>
                                <Label className="text-zinc-600 font-medium text-sm mb-1 block">Work Type</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="text-zinc-900 placeholder:text-zinc-400" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.workType && <span className="text-xs text-danger mt-1">{errors.workType}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="technical" className={listItemClasses} textValue="Technical">Technical</ListBox.Item>
                                        <ListBox.Item id="non-technical" className={listItemClasses} textValue="Non-Technical">Non-Technical</ListBox.Item>
                                        <ListBox.Item id="management" className={listItemClasses} textValue="Management">Management</ListBox.Item>
                                        <ListBox.Item id="design" className={listItemClasses} textValue="Design">Design</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select className={selectBoxClass} name="commitmentLevel" isInvalid={!!errors.commitmentLevel}>
                                <Label className="text-zinc-600 font-medium text-sm mb-1 block">Commitment Level</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="text-zinc-900 placeholder:text-zinc-400" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.commitmentLevel && <span className="text-xs text-danger mt-1">{errors.commitmentLevel}</span>}
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="full-time" className={listItemClasses} textValue="Full-time">Full-time</ListBox.Item>
                                        <ListBox.Item id="part-time" className={listItemClasses} textValue="Part-time">Part-time</ListBox.Item>
                                        <ListBox.Item id="contract" className={listItemClasses} textValue="Contract">Contract</ListBox.Item>
                                        <ListBox.Item id="internship" className={listItemClasses} textValue="Internship">Internship</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-zinc-600 font-medium text-sm">Location</span>

                                    <Switch
                                        isSelected={isRemote}
                                        onChange={setIsRemote}
                                        size="sm"
                                    >
                                        <Switch.Control className="bg-zinc-200 data-[selected=true]:bg-black">
                                            <Switch.Thumb className="bg-white data-[selected=true]:bg-white" />
                                        </Switch.Control>
                                        <Switch.Content>
                                            <Label className="text-xs text-zinc-500 font-medium">Remote</Label>
                                        </Switch.Content>
                                    </Switch>
                                </div>

                                <TextField name="location" isInvalid={!isRemote && !!errors.location} className="flex flex-col gap-1 w-full relative">
                                    <div className="relative flex items-center">
                                        <Globe size={16} className="absolute left-3 text-zinc-400 pointer-events-none z-10" />
                                        <Input
                                            placeholder={isRemote ? "Global / Remote" : "e.g. Austin, TX"}
                                            disabled={isRemote}
                                            className={`${textInputClass} pl-10`}
                                        />
                                    </div>
                                    {!isRemote && errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                                </TextField>
                            </div>

                            <TextField name="deadline" isInvalid={!!errors.deadline} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-600 font-medium text-sm">Deadline</Label>
                                <Input type="date" className={textInputClass} />
                                {errors.deadline && <FieldError className="text-xs text-danger mt-1">{errors.deadline}</FieldError>}
                            </TextField>
                        </div>
                    </Fieldset>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 w-full">
                        <Button
                            type="button"
                            variant="bordered"
                            className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg px-6 font-medium h-11"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-black text-white font-semibold hover:bg-zinc-800 rounded-lg px-6 transition-colors h-11"
                        >
                            Add Opportunity
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}