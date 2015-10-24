// DengLu.cpp : ʵ���ļ�
//

#include "stdafx.h"
#include "Host.h"
#include "DengLu.h"


// CDengLu �Ի���

IMPLEMENT_DYNAMIC(CDengLu, CDialog)

CDengLu::CDengLu(CWnd* pParent /*=NULL*/)
	: CDialog(CDengLu::IDD, pParent)
	, m_editStr(_T(""))
	{
      m_bitmapIndex =134;
}

CDengLu::~CDengLu()
{
}

void CDengLu::DoDataExchange(CDataExchange* pDX)
{
CDialog::DoDataExchange(pDX);
DDX_Control(pDX, IDC_PIC, m_pic);
DDX_Control(pDX, IDC_SCROLLBAR1, m_sll);

DDX_Text(pDX, IDC_EDIT1, m_editStr);
	}


BEGIN_MESSAGE_MAP(CDengLu, CDialog)
	ON_WM_PAINT()
	ON_BN_CLICKED(IDOK, &CDengLu::OnBnClickedOk)
	ON_NOTIFY(NM_THEMECHANGED, IDC_SCROLLBAR1, &CDengLu::OnNMThemeChangedScrollbar1)
	ON_WM_HSCROLL()
	ON_WM_TIMER()
	ON_STN_CLICKED(IDC_STATIC1, &CDengLu::OnStnClickedStatic1)
END_MESSAGE_MAP()


// CDengLu ��Ϣ�������

void CDengLu::OnPaint()
	{
	CPaintDC dc(this); // device context for painting
	CBitmap bmp; 
	bmp.LoadBitmap(m_bitmapIndex); 
	m_pic.SetBitmap((HBITMAP)bmp);
	
	bmp.Detach(); 
	//InvalidateRect( rcPic ); // �ػ�Pic�ؼ����� 
	}
BOOL CDengLu::OnInitDialog()
	{
	CDialog::OnInitDialog();

	CTime cTime = CTime::GetCurrentTime();
	CString strTime;
	//�ַ�����ʽ��ʱ��
	strTime.Format("%d-%d-%d  %d:%d:%d",cTime.GetYear(),cTime.GetMonth(),cTime.GetDay(),cTime.GetHour(),cTime.GetMinute(),cTime.GetSecond());
	//���õ�ǰ���ڱ���
	CWnd * pWnd=GetDlgItem(IDC_STATIC1);
	pWnd->SetWindowText(strTime);
	
	GetDlgItem(IDC_PIC)->GetWindowRect(&m_picRect);//��ȡ�ؼ��������Ļ��λ��
	ScreenToClient(m_picRect);//ת��Ϊ�Ի����ϵ����λ��
	
SetTimer(1,1000,NULL);//����ʱ��

 m_sll.SetScrollRange(0,3);

	return TRUE;  // return TRUE unless you set the focus to a control
	// �쳣: OCX ����ҳӦ���� FALSE
	}

void CDengLu::OnBnClickedOk()
	{

	  GetDlgItemText(IDC_EDIT1,m_editStr);
	  if (m_editStr.GetLength()>=4&&m_editStr.GetLength()<=12)
	  {
	  OnOK();
	  
	 }else
	 {
	   AfxMessageBox("�Բ����ǳƱ�����4-12���ַ�֮�䣡");
	   m_bitmapIndex;
	}
	//
	}

void CDengLu::OnNMThemeChangedScrollbar1(NMHDR *pNMHDR, LRESULT *pResult)
	{
	//AfxMessageBox("dsdsd");
	
	*pResult = 0;
	}

void CDengLu::OnHScroll(UINT nSBCode, UINT nPos, CScrollBar* pScrollBar)
	{
	
	int currpos,minpos,maxpos;
	currpos=m_sll.GetScrollPos();
	m_sll.GetScrollRange(&minpos,&maxpos);
	
	switch(nSBCode)
		{
			break;
		case SB_LINELEFT:
			if (currpos>minpos)
			{
			currpos--;
			m_bitmapIndex--;
			
			}
			break;
		case SB_LINERIGHT:
			if (currpos<maxpos)
			{
			currpos++;
			m_bitmapIndex++;
			}
			break;
		}
 m_sll.SetScrollPos(currpos);
 InvalidateRect(m_picRect,0);
	CDialog::OnHScroll(nSBCode, nPos, pScrollBar);
	}


void CDengLu::OnTimer(UINT_PTR nIDEvent)
	{

	CTime cTime = CTime::GetCurrentTime();
	CString strTime;
	//�ַ�����ʽ��ʱ��
	strTime.Format("%d-%d-%d  %d:%d:%d",cTime.GetYear(),cTime.GetMonth(),cTime.GetDay(),cTime.GetHour(),cTime.GetMinute(),cTime.GetSecond());
	//���õ�ǰ���ڱ���
	CWnd * pWnd=GetDlgItem(IDC_STATIC1);
	pWnd->SetWindowText(strTime);
	

	CDialog::OnTimer(nIDEvent);
	}

void CDengLu::OnStnClickedStatic1()
	{
	// TODO: �ڴ���ӿؼ�֪ͨ����������
	}

BOOL CDengLu::Create(LPCTSTR lpszTemplateName, CWnd* pParentWnd)
	{
	// TODO: �ڴ����ר�ô����/����û���
	

	return CDialog::Create(lpszTemplateName, pParentWnd);
	}
