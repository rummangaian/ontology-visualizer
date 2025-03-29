import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { xml } from "@codemirror/lang-xml";

const CodeEditor = ({handleEditorSaveCode}) => {
  const editorRef = useRef(null);
  const editorViewRef = useRef(null); // Keep track of the editor instance
  const [xmlContent, setXmlContent] = useState(`@prefix : <http://example.org/hrms#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .


:EmployeeAttendance a owl:Class ;
    rdfs:label "Employee Attendance" ;
    rdfs:comment "Primary class representing attendance records in the HRMS." .

:AuthenticationLog a owl:Class ;
    rdfs:label "Authentication Log" ;
    rdfs:comment "Stores log information about employee authentication attempts." .

:AttendanceValidation a owl:Class ;
    rdfs:label "Attendance Validation" ;
    rdfs:comment "Contains records for validating attendance entries." .

:AttendanceAlerts a owl:Class ;
    rdfs:label "Attendance Alerts" ;
    rdfs:comment "Represents alert messages or notifications related to attendance." .

:BehaviorMonitoring a owl:Class ;
    rdfs:label "Behavior Monitoring" ;
    rdfs:comment "Keeps track of behavior analytics such as break counts and alert triggers." .

:HRMSIntegration a owl:Class ;
    rdfs:label "HRMS Integration" ;
    rdfs:comment "Represents the integration status between HRMS and other systems." .


:employeeAttendanceId a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Attendance Identifier" .

:employeeId a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Employee Identifier" .

:attendanceDate a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:date ;
    rdfs:label "Attendance Date" .

:entryTime a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:time ;
    rdfs:label "Entry Time" .

:exitTime a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:time ;
    rdfs:label "Exit Time" .

:authenticationStatus a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Authentication Status" .

:cardAuthentication a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:boolean ;
    rdfs:label "Card Authentication Flag" .

:facialRecognitionStatus a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Facial Recognition Status" .

:behaviorAnalytics a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Behavior Analytics" .

:breakCount a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:integer ;
    rdfs:label "Break Count" .

:workingHours a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:decimal ;
    rdfs:label "Working Hours" .

:hrmsStatus a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "HRMS Status" .

:managerApproval a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Manager Approval" .

:attendanceReason a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Attendance Reason" .

:hrmsAbsenceReason a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "HRMS Absence Reason" .

:exitGateStatus a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Exit Gate Status" .

:alertsSent a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:boolean ;
    rdfs:label "Alerts Sent Flag" .

:alertsRecipient a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Alerts Recipient" .

:employeeStatus a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Employee Status" .

:purgeId a owl:DatatypeProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range xsd:string ;
    rdfs:label "Purge Identifier" .


:authenticationLogId a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:string ;
    rdfs:label "Authentication Log Identifier" .

:authLogEmployeeId a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:string ;
    rdfs:label "Employee Identifier in Auth Log" .

:authenticationMethod a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:string ;
    rdfs:label "Authentication Method" .

:authStatus a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:string ;
    rdfs:label "Authentication Status" .

:authDate a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:date ;
    rdfs:label "Authentication Date" .

:authTime a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:time ;
    rdfs:label "Authentication Time" .

:failureReason a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:string ;
    rdfs:label "Failure Reason" .

:attemptCount a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:integer ;
    rdfs:label "Attempt Count" .

:authLogPurgeId a owl:DatatypeProperty ;
    rdfs:domain :AuthenticationLog ;
    rdfs:range xsd:string ;
    rdfs:label "Authentication Log Purge Identifier" .


:attendanceValidationId a owl:DatatypeProperty ;
    rdfs:domain :AttendanceValidation ;
    rdfs:range xsd:string ;
    rdfs:label "Attendance Validation Identifier" .

:validationEmployeeId a owl:DatatypeProperty ;
    rdfs:domain :AttendanceValidation ;
    rdfs:range xsd:string ;
    rdfs:label "Employee Identifier in Validation" .

:validationStatus a owl:DatatypeProperty ;
    rdfs:domain :AttendanceValidation ;
    rdfs:range xsd:string ;
    rdfs:label "Validation Status" .

:validationReason a owl:DatatypeProperty ;
    rdfs:domain :AttendanceValidation ;
    rdfs:range xsd:string ;
    rdfs:label "Validation Reason" .

:validationDate a owl:DatatypeProperty ;
    rdfs:domain :AttendanceValidation ;
    rdfs:range xsd:date ;
    rdfs:label "Validation Date" .

:validatedBy a owl:DatatypeProperty ;
    rdfs:domain :AttendanceValidation ;
    rdfs:range xsd:string ;
    rdfs:label "Validated By" .

:validationPurgeId a owl:DatatypeProperty ;
    rdfs:domain :AttendanceValidation ;
    rdfs:range xsd:string ;
    rdfs:label "Validation Purge Identifier" .


:attendanceAlertId a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:string ;
    rdfs:label "Attendance Alert Identifier" .

:alertType a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:string ;
    rdfs:label "Alert Type" .

:alertEmployeeId a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:string ;
    rdfs:label "Employee Identifier in Alert" .

:alertStatus a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:string ;
    rdfs:label "Alert Status" .

:alertDate a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:date ;
    rdfs:label "Alert Date" .

:alertRecipient a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:string ;
    rdfs:label "Alert Recipient" .

:alertReason a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:string ;
    rdfs:label "Alert Reason" .

:alertPurgeId a owl:DatatypeProperty ;
    rdfs:domain :AttendanceAlerts ;
    rdfs:range xsd:string ;
    rdfs:label "Alert Purge Identifier" .


:behaviorMonitoringId a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:string ;
    rdfs:label "Behavior Monitoring Identifier" .

:behaviorEmployeeId a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:string ;
    rdfs:label "Employee Identifier in Behavior Monitoring" .

:monitoredBreakCount a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:integer ;
    rdfs:label "Monitored Break Count" .

:maxAllowedBreaks a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:integer ;
    rdfs:label "Maximum Allowed Breaks" .

:behaviorStatus a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:string ;
    rdfs:label "Behavior Status" .

:alertsTriggered a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:boolean ;
    rdfs:label "Alerts Triggered Flag" .

:lastAlertDate a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:date ;
    rdfs:label "Last Alert Date" .

:behaviorPurgeId a owl:DatatypeProperty ;
    rdfs:domain :BehaviorMonitoring ;
    rdfs:range xsd:string ;
    rdfs:label "Behavior Monitoring Purge Identifier" .


:hrmsIntegrationId a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:string ;
    rdfs:label "HRMS Integration Identifier" .

:integrationEmployeeId a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:string ;
    rdfs:label "Employee Identifier in HRMS Integration" .

:integrationStatus a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:string ;
    rdfs:label "Integration Status" .

:integrationReason a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:string ;
    rdfs:label "Integration Reason" .

:approvalStatus a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:string ;
    rdfs:label "Approval Status" .

:approvalDate a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:date ;
    rdfs:label "Approval Date" .

:hrmsStatusUpdated a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:boolean ;
    rdfs:label "HRMS Status Updated Flag" .

:integrationPurgeId a owl:DatatypeProperty ;
    rdfs:domain :HRMSIntegration ;
    rdfs:range xsd:string ;
    rdfs:label "HRMS Integration Purge Identifier" .


:hasAuthenticationLog a owl:ObjectProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range :AuthenticationLog ;
    rdfs:label "has authentication log" ;
    rdfs:comment "Relates an employee attendance record to one or more authentication logs." .

:hasAttendanceValidation a owl:ObjectProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range :AttendanceValidation ;
    rdfs:label "has attendance validation" ;
    rdfs:comment "Links an attendance record with its validation details." .

:hasAttendanceAlert a owl:ObjectProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range :AttendanceAlerts ;
    rdfs:label "has attendance alert" ;
    rdfs:comment "Connects an attendance record with alert notifications." .

:hasBehaviorMonitoring a owl:ObjectProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range :BehaviorMonitoring ;
    rdfs:label "has behavior monitoring" ;
    rdfs:comment "Associates an attendance record with behavior monitoring data." .

:hasHRMSIntegration a owl:ObjectProperty ;
    rdfs:domain :EmployeeAttendance ;
    rdfs:range :HRMSIntegration ;
    rdfs:label "has HRMS integration" ;
    rdfs:comment "Relates an attendance record to HRMS integration details." .
`);

  useEffect(() => {
    if (!editorRef.current || editorViewRef.current) return; // Prevent duplicate initialization

    const state = EditorState.create({
      doc: xmlContent,
      extensions: [
        basicSetup,
        xml(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setXmlContent(update.state.doc.toString());
          }
        }),
      ],
    });

    // Initialize the editor
    editorViewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      // Cleanup to prevent memory leaks
      if (editorViewRef.current) {
        editorViewRef.current.destroy();
        editorViewRef.current = null;
      }
    };
  }, []);


  return (
    <div className="editor-container" style={{ padding: "10px" }}>
        <div>
      <h3>XML Code Editor</h3>
<button onClick={()=>handleEditorSaveCode(xmlContent)}>Save</button>
        </div>
      <div ref={editorRef} style={{ border: "1px solid #ccc", height: "400px", overflow: "auto" }}></div>
    </div>
  );
};

export default CodeEditor;
