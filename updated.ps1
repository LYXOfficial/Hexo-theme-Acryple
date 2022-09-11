
$fileEncoding = "UTF8";

# https://www.manongdao.com/article-846164.html
Function Convert-FromUnixDate ($UnixDate) {
    [timezone]::CurrentTimeZone.ToLocalTime(([datetime]'1/1/1970').AddSeconds($UnixDate))
}

#$OutputEncoding = New-Object -typename System.Text.UTF8Encoding

#[console]::outputencoding=[system.text.encoding]::utf8

#Write-Host("�뽫���ű��� Hexo ��Ŀ¼ִ��");
#Write-Host("��ʼ���� updated");

$fileNum = 0;
Get-ChildItem -Path "./source/_posts" -recurse *.md | ForEach-Object -Process{
    $fileNum = $fileNum + 1;
    if ($_ -is [System.IO.FileInfo]) {

        $filePath = $_.FullName;
        Write-Host('{0}. {1}' -f $fileNum, $filePath);
        
        $lineNum = 0; # yaml ��ʽռ������
        $yamlStartEndNum = 0;
        $existUpdated = $false;
        $updatedNum = 0;
        $newstreamreader = New-Object System.IO.StreamReader($filePath);
        while (($readeachline = $newstreamreader.ReadLine()) -ne $null) {
            $lineNum = $lineNum + 1;
            $temp = $readeachline -replace " ","" -replace "\n",""
            if ($temp -match "---") {
                $yamlStartEndNum = $yamlStartEndNum + 1;
            }
            if ($readeachline.Contains("updated:")) {
                $existUpdated = $true;
                $updatedNum = $lineNum;
            }
            if ($yamlStartEndNum -ge 2) {
                # yaml end
                break;
            }
        }
        $newstreamreader.Dispose();

        $filedata = Get-Content -Path $filePath -Encoding $fileEncoding;
        $oldYamlStr = $filedata | Select-Object -First $lineNum

        # git log format: https://www.cnblogs.com/ckAng/p/11205055.html https://git-scm.com/docs/git-log
        # ���ļ� ���һ�� commit �� Unixʱ���
        $dateUpdated = git log -1 --format='%ct' $filepath
        $dateUpdated = Convert-FromUnixDate $dateUpdated
        $dateUpdated = $dateUpdated.ToString("yyyy-MM-dd HH:mm:ss");
        $newUpdated = "updated: " + $dateUpdated;

        #Write-Host("newUpdated: " + $newUpdated)

        $newYamlStr = ""
        # ע��: yamlStr ��һ������, ÿһ��Ԫ��Ϊһ���ַ���
        $tempOldYamlStr = $oldYamlStr;
        if ($existUpdated) {
            #Write-Host($yamlStr[$updatedNum-1])    
            $oldUpdated = $oldYamlStr[$updatedNum-1];
            $tempOldYamlStr[$updatedNum-1] = $oldYamlStr[$updatedNum-1] -replace $oldUpdated,$newUpdated
        }else {
            # �޸� yaml ������
            # TODO: ����ȡ������һ�в����� ���Ļ��з�, ���¼�һ�� ���� ��������, ����Ϊ�˱���, ���Ǽ���һ������
            $tempOldYamlStr[$lineNum-1] = $newUpdated + $([System.Environment]::NewLine) + "---" + $([System.Environment]::NewLine)
        }
        $newYamlStr = $tempOldYamlStr

        Write-Output $newYamlStr


        $newFiledata = $newYamlStr + $filedata[$lineNum..$filedata.count]
        $newFiledata | Set-Content -Path $filePath -Encoding $fileEncoding

    }
}

#Write-Host("���� updated ���");

